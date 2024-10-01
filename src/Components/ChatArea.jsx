import { useEffect, useState } from 'react';
import dateFormat from "dateformat";
import { isToday } from 'date-fns';

const ChatArea = ({ messages, setMessages, selectedUser, isLoading }) => {

    if (isLoading) return <div className="bg-[#f6f6f6] rounded-2xl flex items-center justify-center flex-1 overflow-y-auto">{<div className="text-gray-700">is Loading...</div>}</div>

    return (
        <div className="bg-[#f6f6f6] p-5 pb-0 rounded-2xl flex flex-col-reverse flex-1 overflow-y-auto">
            {messages.map(message => {
                let date = isToday(message.createdAt) ? dateFormat(message.createdAt, "HH:MM") : dateFormat(message.createdAt, "mmmm dd");

                return <div key={message._id} className={message.sentTo === selectedUser._id ? "text-right mb-3" : "text-left mb-3"}>
                    <div className={"py-2 px-4 mb-1 text-sm inline-block w-auto max-w-sm rounded-xl " + (message.sentTo === selectedUser._id ? "bg-gray-300 text-black rounded-br-none" : "bg-gray-700 text-white rounded-tl-none")}>
                         {message.text}
                     </div>
                     <p className="text-[9px] text-gray-500">{date}</p>
                </div>;
            }).reverse()}
        </div>
    );
};

export default ChatArea;