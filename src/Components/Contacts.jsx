import React from 'react'

const Contacts = ({ children }) => {
    return (
        <div className="bg-[#F6F6F6] py-5 rounded-2xl flex-1 h-full overflow-y-auto">
            { children }
        </div>
    )
}

export default Contacts
