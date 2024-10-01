import Clip from "../icons/Clip";
import Smile from "../icons/Smile";
import Mic from "../icons/Mic";
import Send from "../icons/Send";
import { useEffect, useRef } from "react";

const TypeBar = ({ selectedUser, setMessages }) => {
    const inputRef = useRef(null);

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const message = inputRef.current.value.trim();
        inputRef.current.value = '';
        if (!message) return;
        
        const repounse = await fetch("https://chat-backend-awf8.onrender.com/messages/post/" + selectedUser._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ content: message, token: sessionStorage.getItem("token") })
        });

        if (repounse.ok) {
            const data = await repounse.json();
            setMessages(m => [...m, data])
        }

        inputRef.current.focus();
    };

    useEffect(() => {inputRef.current.focus()}, []);

    return (
        <form onSubmit={sendMessageHandler} className="h-12 flex gap-2">
            <div className="flex-1 bg-[#f6f6f6] rounded-xl relative overflow-hidden">
                <input
                    type="text"
                    ref={inputRef}
                    className="absolute w-full h-full top-0 left-0 pl-12 text-xs focus:outline-none rounded-e-xl"
                    placeholder="Write messages..."
                />
                <div className="absolute top-1/2 -translate-y-1/2 left-5">
                    <Clip color="black" className="h-4 w-4" />
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                    <Smile color="black" className="h-4 w-4" />
                </div>
            </div>
            <div className="bg-[#f6f6f6] h-12 w-12 flex items-center justify-center rounded-xl">
                <Mic className="h-5 w-5" color="black" />
            </div>
            <button className="bg-lightOrange h-12 w-12 flex items-center justify-center rounded-xl">
                <Send className="h-5 w-5" color="white" />
            </button>
        </form>
    )
}

export default TypeBar
