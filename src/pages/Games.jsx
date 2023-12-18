import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import ProcessVote from '../components/ProcessVote';
import ImageGen from '../components/ImageGen';





function Games() {
  const [match, setMatch] = useState(null); 
 

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/dailymatches');
        const json = await response.json();

        if (response.ok) {
          setMatch(json); 
        }
      } catch (error) {
        console.error("Failed to fetch match:", error);
      }
    };

    fetchMatch();
  }, []);



  // NOTE : 
  // The dailymatches collection is refernecing the teams objectID
  // check the dailymatches model for more info
  // Need to reference teamName from the matches, think match -> team -> teamAttribute 
  // check the dailymatches router for more info on how that works
 
 
  // ROADMAP:
  // Add externalized component to handle adding to the totalBets for a certain team,
  // but NOTE THAT IT ISN'T STORED IN THE MATCH MODEL, BUT INSTEAD THE TEAM MODEL
 
  return (
    <main className="main-content">
      <Navbar callerPage="Games" />

      <div className="main-container-below-navbar">
        <div className="title">
          <h1 className="text-center text-7xl font-extrabold my-8">TODAY'S GAMES</h1>
        </div>
        <div className="games-container py-2 h-screen flex justify-around">
          {match ? (
            <div>
              {/* Top portion of the game page */}
              <div className = "flex justify-around">

                {/* sec1 */}
                {/* p-6 border-2 rounded-xl border-gray-500 shadow-lg */}
                <div className="game text-center text-3xl min-w-600">
                  {/* border-8 rounded-2xl */}
                 <div className = " px-8 py-4 flex " style={{ minWidth: '600px', maxWidth: '750px' }}>
                 <div className = "flex flex-col justify-between" style={{ minWidth: '200px' }}>
                      <div>
                      <h4 className = ""><strong>{match.team1.teamName}</strong></h4>
                      <p className = "text-sm ">{match.team1.wins} - {match.team1.losses}</p>
                      </div>
                      <ImageGen name = {match.team1.teamName} />
                     
                    </div>

                    <h4 className = " mx-28 my-auto">VS</h4>

                    <div className = "flex flex-col justify-between" style={{ minWidth: '200px' }}>
                      <div>
                      <h4><strong>{match.team2.teamName}</strong></h4>
                      <p className = "text-sm">{match.team2.wins} - {match.team2.losses}</p>
                      </div>
                      <ImageGen name = {match.team2.teamName} />
                     
                    </div>
                  </div>
                </div>
                <div className = " border-l-2 border-black"></div>
                {/* sec2 */}

                <div className="game text-center text-3xl min-w-600">
                  {/* border-8 rounded-2xl */}
                  <div className = " flex px-8 py-4" style={{ minWidth: '600px' }}>
                  <div className = "flex flex-col justify-between" style={{ minWidth: '200px' }}>
                    <div>
                      <h4><strong>{match.team3.teamName}</strong></h4>
                      <p className = "text-sm">{match.team3.wins} - {match.team3.losses}</p>
                    </div>
                      <ImageGen name = {match.team3.teamName} />
                      
                    </div>

                    <h4 className = " mx-28 my-auto">VS</h4>

                    <div className = "flex flex-col justify-between" style={{ minWidth: '200px' }}>
                    <div>
                      <h4><strong>{match.team4.teamName}</strong></h4>
                      <p className = "text-sm">{match.team4.wins} - {match.team4.losses}</p>
                    </div>
                      <ImageGen name = {match.team4.teamName} />
                     
                    </div>
                  </div>
                </div>


              </div>
              {/* End of top portion */}
              {/* Bottom Portion, contains voting logic */}
              <div>
                <ProcessVote match = {match} />
              </div>

            </div>
          ) : (
            <div className="text-center">Loading match...</div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Games;