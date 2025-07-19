import React from "react";

const DeleteSessionAlert = ({
    sessionData,
    deleteSession,
    onCancel
}) => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-3">Delete the Session</h1>
            <h2 className="text-lg mb-7">Are you sure you want to delete this <span className="italic text-gray-700">{sessionData.role}</span> session?</h2>
            <div></div>
            <div className="flex items-center justify-end gap-6">
                <button 
                    className="bg-orange-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={deleteSession}
                >
                    Delete
                </button>
                <button 
                    className="bg-gray-400 text-gray-900 px-4 py-2 rounded-lg cursor-pointer"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
            
        </div>
    )
}

export default DeleteSessionAlert;