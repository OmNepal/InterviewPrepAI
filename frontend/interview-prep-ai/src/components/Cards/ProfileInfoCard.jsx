import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
    const {user, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/")
    }

    return (
        <div className='flex items-center'>
            <div className='w-10 h-10 bg-gray-300 rounded-full mr-3 text-center text-gray-500 font-bold pt-2 cursor-pointer hover:bg-gray-100'>{user.name.charAt(0)}</div>
            <div>
                <div className='text-[17px] text-black font-bold leading-3'>
                    {user.name || ""}
                </div>
                <button className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfoCard