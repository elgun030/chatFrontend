import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import Contacts from "../Components/Contacts";
import ProfileBar from "../Components/ProfileBar";
import ChatArea from "../Components/ChatArea";
import TypeBar from "../Components/TypeBar";
import SingleUser from "../Components/SingleUser";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [onlineUsersNames, setOnlineUsersNames] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const selectedUserRef = useRef(selectedUser);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const getMessages = async () => {
    try {
      const response = await fetch("https://chat-backend-awf8.onrender.com/messages/get/" + selectedUser._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ token: sessionStorage.getItem("token") })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    if (!userName) {
      navigate("/sign-in");
      return;
    }

    const socket = io("https://chat-backend-awf8.onrender.com", {
      query: {
        userName: userName
      }
    });

    const handleGetOnlineUsers = (userNames) => {
      setOnlineUsersNames(userNames);
    };

    const handleNewMessage = ({ newMessage, senderId}) => {
      if (senderId === selectedUserRef.current._id) {
        setMessages(m => [...m, newMessage]);
      }
    };

    socket.on("getOnlineUsers", handleGetOnlineUsers);
    socket.on("newMessage", handleNewMessage);

    fetch("https://chat-backend-awf8.onrender.com/users", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: sessionStorage.getItem("token") })
    })
    .then(res => {
      if (!res.ok) return res.json().then(data => {throw new Error(`Network response was not ok. Status: ${res.status}, Message: ${data.message}`);});
      return res.json();
    })
    .then(data => setUsers(data.data))
    .catch(err => console.error('Fetch error:', err));

    return () => {
      socket.off("getOnlineUsers", handleGetOnlineUsers);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (selectedUser === null) return;
    setIsLoading(true);
    getMessages();
  }, [selectedUser]);

  const selecteUserHandler = useCallback((user) => {
    if (selectedUser === user) return;
    setIsLoading(true);
    setSelectedUser(user);
  }, [selectedUser]);

  return (
    <div className="h-[600px] w-full flex gap-2">
      <Sidebar />
      <div className="flex-1 grid grid-cols-12 gap-2">
        <div className="h-full col-span-5 flex flex-col gap-2 overflow-y-hidden">
          <SearchBar />
          <Contacts>
            {users.filter(user => user.userName !== sessionStorage.getItem("userName")).map(user => (
              <SingleUser
                isOnline={onlineUsersNames.includes(user.userName)}
                data={user}
                key={user._id}
                selecteUserHandler={() => selecteUserHandler(user)}
              />
            ))}
          </Contacts>
        </div>
        <div className="h-full col-span-7 flex flex-col gap-2 overflow-y-hidden">
          {selectedUser && (
            <>
              <ProfileBar selectedUser={selectedUser} />
              <ChatArea
                selectedUser={selectedUser}
                setMessages={setMessages}
                messages={messages}
                isLoading={isLoading}
              />
              <TypeBar selectedUser={selectedUser} setMessages={setMessages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
