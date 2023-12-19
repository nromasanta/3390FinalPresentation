import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Route, Routes } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageGen from './components/ImageGen';
import Admin from './pages/Admin';
import League from './pages/League';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import MyLeague from './pages/MyLeague';
import Dev from './pages/Dev';
import Leaderboard from './pages/Leaderboard';
import Games from './pages/Games';
import Userboard from './pages/Userboard';
// import background from './assets/muha-ajjan-sL2BRR1cuvM-unsplash.png';
import background from './assets/bgtime.png';
import roadrunner3 from './assets/roadrunner3.png';
import usePageNavigator from './components/usePageNavigator';
import i404 from './assets/i404.png';
import angel from './assets/angel.png';
import Diamond from './assets/Diamond_Dogs.png';
import good from './assets/good.png';
import hunter from './assets/hunter.png';
import pollos from './assets/pollos.png';
import runner from './assets/runner.png';
import solid from './assets/solid.png';
import thief from './assets/thief.png';
import tragic from './assets/tragic.png';
const teamImages = {
    'Team Solo Good': good,
    'Team Roadrunner': runner,
    'Team Solid': solid,
    '99 Thieves': hunter,
    'Team 404': i404,
    'Team Tragic': tragic,
    'Los Pollos Hermanos': pollos,
    'Los Angeles Angels': angel,
    'Diamond Dogs': Diamond,
    'The Vault Hunters': thief,
  };



function App() {
    const {handleGoToLeague, handleGoToLogin, handleGoToHome, 
        handleGoToSignup, handleGoToProfile, handleGoToMyLeague, handleGoToGames, handleGoToUserboard} = usePageNavigator();
    //const pages = ['Profile', 'Admin', 'Settings']; // Pages
    return(
<div className="newContainer h-screen w-screen">
                    <Routes>
                        {/*--------------- Landing Content ---------------*/}
                        <Route exact path="/" element = {
                        <>
                            <Navbar callerPage = "App" />
                            {/* <div className = "border-b-2 border-gray-300 h-0 mt-0 w-12/12 mx-auto flex-col justify-center" style={{position: 'relative', top: '9px'}}></div> */}
                            <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', size:'cover', top: '8px', backdropFilter: 'blur(10px)', opacity: '0.9', height: '100vh'}}>
                           

                             {/*~~~~~~~~~~~~~~~~~~*/}    
                            {/* Below the image box wrapper */}
                            
                                
                                <div className="flex flex-col items-center justify-center">
                                    <img src = {roadrunner3} alt = "roadrunner"  className = "p-5 mt-32"/>
                                    
                                    <div className="text-center cursor-pointer text-white font-bold text-4xl px-4 py-2 inline-block rounded-lg bg-red-500 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
                                    onClick = {handleGoToUserboard}>
                                        Join Our Leaderboard
                                    </div>
                                    <div className = "mt-2 font-semibold">
                                        CSUB's Premiere Esports Application
                                    </div>
                                    
                                </div>
                                <div className="team-images mt-10 flex">
                                <ImageGen name="Team Solo Good" />
                                <ImageGen name="Team Roadrunner" />
                                <ImageGen name="Team Solid" />
                                <ImageGen name="99 Thieves" />
                                <ImageGen name="Team 404" />
                                </div>

                                <div className="team-images mt-10 flex">
                                <ImageGen name="Team Tragic" />
                                <ImageGen name="Los Pollos Hermanos" />
                                <ImageGen name="Los Angeles Angels" />
                                <ImageGen name="Diamond Dogs" />
                                <ImageGen name="The Vault Hunters" />
                                </div>


                                



                            </div>
                        
                    </>
                        } />
                        {/*--------------- Landing Content ---------------*/}
          
                        <Route path = "/admin" element ={<Admin />}/>
                        <Route path = "/league" element = {<League />} />
                        <Route path = "/login" element = {<Login />} />
                        <Route path = "/signup" element = {<Signup />} />
                        <Route path = "/profile/" element = {<Profile />} />
						<Route path = "/myleague/:id" element = {<MyLeague />} />
                        <Route path = "/myleague/" element = {<MyLeague />} />
                        <Route path = "/games/" element = {<Games />} />
                        <Route path = "/leaderboard/" element = {<Leaderboard />} />
                        <Route path = "/dev/" element = {<Dev />} />
                        <Route path = "/userboard/" element = {<Userboard />} />
                    </Routes>
      
            </div>

    );
}

export default App;