import React from 'react';

const UserDetails = ({ user, position }) => {
    return (
        <div className = "border max-w-600 mx-auto">
        <div className="flex justify-around items-center py-2 px-4 border-b border-gray-300">
            <div className="flex items-center space-x-2">
                <span className="font-bold text-2xl text-black">{position}.</span>
                <span className="text-gray-600 font-bold text-2xl">{user.username}</span>
            </div>
            <div>
                <span className="text-gray-600 font-bold text-2xl">{user.points} pts</span>
            </div>
        </div>
        </div>
    );
}

export default UserDetails;