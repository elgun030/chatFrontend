import React from 'react'

const SingleUser = ({ data, selecteUserHandler, isOnline }) => {
    return (
        <div onClick={selecteUserHandler} className="flex justify-between p-5 border-b bg-gray-200border-gray-300 transition-all duration-200 hover:bg-gray-200 cursor-pointer">
            {/* Left */}
            <div className="flex gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
                    <img
                        src={data.profilePic}
                        alt="profile"
                        className="h-full w-full"
                    />
                </div>
                <div>
                    <h4 className="text-sm text-black mb-1 line-clamp-1">{ data.fullName }</h4>
                    <p className="text-xs text-gray-400">{ data.userName }</p>
                </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-start items-end shrink-0">
                <p className="text-xs text-gray-400 mb-2">10:27 AM</p>
                <p className={"text-right h-4 w-4 text-white rounded-full text-[9px] flex items-center justify-center " + (isOnline ? "bg-green-500": "bg-red-500")}></p>
            </div>
        </div>
    );
};

export default SingleUser;
