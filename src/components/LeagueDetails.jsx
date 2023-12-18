import React, { useContext } from 'react';
import UserContext from './UserContext';

const LeagueDetails = ({ league }) => {

    const { user } = useContext(UserContext); // Access user from context

    if (user) {
      console.log('User is logged in with username:', user.username);
    } else {
      console.log('No logged in user found in context.');
    }
    return (
        <div className = "p-6 border-2 rounded-xl border-gray-500 shadow-lg mr-auto ml-5 mt-5 w-1/2"> 
            <h4><strong>{league.leagueName}</strong></h4>
            <p><strong>Member Count: </strong>{league.memberCount}</p>
            <button className = "text-red-500">Join</button>
        </div>
    )
}

export default LeagueDetails