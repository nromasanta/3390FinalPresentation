import React, { useContext } from 'react';


const TeamDetails = ({ team }) => {



    return (
        <div className = "border-t-2 border-gray-300 w-9/12 mx-auto"> 
            <div className = "py-2 grid grid-cols-4 gap-4">
                <h4><strong>{team.teamName}</strong></h4>
                <p><strong>W: </strong>{team.wins}</p>
                <p><strong>L: </strong>{team.losses}</p>
                <p><strong>Strength Index: </strong>{team.skillIndex}</p>
                {/* <button className = "text-red-500">Join</button> */}
            </div>
        </div>
    )
}

export default TeamDetails