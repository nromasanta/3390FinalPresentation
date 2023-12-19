import usePageNavigator from './usePageNavigator';
import React, {useContext} from 'react';
import UserContext from './UserContext';

// callerPage is part of old logic we don't use anymore, but keeping it in for now

const Navbar = ( { callerPage } ) => {

    // let showSignup = true; 
    // if (callerPage === "App") {
    //     let showSignup = false;
    // }

    const fetchUserData = async () => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) { // needed to make sure it actually returned something
          try {
            const response = await fetch(`http://localhost:4000/api/users/byUsername/${storedUsername}`);
            const data = await response.json();
            if (response.ok) {
            //   console.log('allgood')
            } else {
              console.error('Failed to fetch user data');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
      fetchUserData();
  
    // console.log(callerPage);

    const { user, logout } = useContext(UserContext); // grab logout function so we can update user context
    const {handleGoToLeague, handleGoToLogin, handleGoToHome, 
        handleGoToSignup, handleGoToProfile, handleGoToLeaderboard, handleGoToGames, handleGoToUserboard} = usePageNavigator();
    const handleSignoutClicker = () => {
        logout(); // update context see ya
        handleGoToHome();
    }
    return (  
        // NOTE that MyLeague is using league-button, change if you want
      
        // functions imported from ./usePageNavigator
        // to add more pages, follow instructions in usePageNavigator.js
        <div className = "flex justify-center w-screen text-2xl">
            <nav className="outer p-4 w-11/12">
                <div className = "flex justify-between items-end">
                    <div>
                        <button className = "font-bold py-2 px-4 rounded text-4xl text-red-500 hover:scale-110 transition-transform duration-300" onClick = {handleGoToHome}>Esports</button>
                        <button className = "font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick = {handleGoToGames}>Games</button>
                        {/* <button className = "font-bold py-2 px-4 rounded text-gray-600" onClick = {handleGoToLeague}>Leagues</button> */}
                        <button className = "font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick = {handleGoToLeaderboard}>Standings</button>
                        <button className = "font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick = {handleGoToUserboard}>Top Players</button>
                    </div>
                {/* Need to change this so it's truly centered */}
                {/* <h1 className = "font-bold py-2 px-4 rounded text-gray-600"> - Logo - </h1> */}
        
                    <div>
                    {user ? (
                            // Show these buttons if the user is logged in
                            <>
                                {/* <button className="font-bold py-2 px-4 rounded text-gray-600" onClick={handleGoToProfile}>Profile</button> */}
                                <div className="inline-block font-bold py-2 px-4 rounded text-gray-500"> Points - {user.points} </div>
                                <button className="font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick={handleSignoutClicker}>Log Out</button>
                            </>
                        ) : (
                            // Show these buttons if no user is logged in
                            <>
                                <button className="font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick={handleGoToLogin}>Login</button>
                                <button className="font-bold py-2 px-4 rounded text-gray-500 hover:scale-110 transition-transform duration-300" onClick={handleGoToSignup}>Sign Up</button>
                              
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
            
    );
}
 
export default Navbar;