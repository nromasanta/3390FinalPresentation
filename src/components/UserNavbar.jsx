import usePageNavigator from './usePageNavigator';

// callerPage is part of old logic we don't use anymore, but keeping it in for now

const UserNavbar = ( { callerPage } ) => {

    console.log(callerPage);


    const {handleGoToLeague, handleGoToLogin, handleGoToHome, 
        handleGoToSignup, handleGoToProfile, handleGoToMyLeague, handleGoToGames} = usePageNavigator();

    return (  
        // NOTE that MyLeague is using league-button, change if you want
      
        // functions imported from ./usePageNavigator
        // to add more pages, follow instructions in usePageNavigator.js
        <div className = "flex justify-center w-screen ">
            <nav className="outer p-4 w-11/12">
            <div className = "flex justify-between items-end">
                    <div>
                        <button className = "font-bold py-2 px-4 rounded text-4xl text-red-500" onClick = {handleGoToHome}>Esports</button>
                        <button className = "font-bold py-2 px-4 rounded text-gray-600" onClick = {handleGoToGames}>Games</button>
                    </div>
        
                    <div>
                        {/* Will need to include logic to replace login and signup with myleague and profile */}
                        <button className = "font-bold py-2 px-4 rounded text-gray-600" onClick = {handleGoToLogin}>My League</button>
                        <button className = "font-bold py-2 px-4 rounded text-red-600" onClick = {handleGoToSignup}>Log Out</button>
                    </div>
                </div>
            </nav>
        </div>
            
    );
}
 
export default UserNavbar;