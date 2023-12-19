//import logo from './logo.svg';
import {useEffect, useState} from 'react';
import TeamDetails from '../components/TeamDetails';
//import useFetch from '../components/useFetch';
import Navbar from '../components/Navbar'
// Page displaying all the active leagues on the application


function Leaderboard() {

  
  const [teams, setTeams] = useState(null)
  useEffect(() => {
    
    const fetchTeams = async() => {
      const response = await fetch('http://localhost:4000/api/teams')
      const json = await response.json()

      if (response.ok){
        const sortedTeams = [...json].sort((a,b) => b.skillIndex - a.skillIndex);
        setTeams(sortedTeams)
      }
    }

    fetchTeams()
  }, [])

  return (

    <main className="main-content">
      <Navbar callerPage="Leaderboard" />
      <div className = "mt-5 text-2xl">
        {/* Think of mapping like a for loop */}
        {teams && teams.map((team) => (
          <TeamDetails key = {team._id} team = {team} />
        ))}
    </div>
    </main>


  )
}

export default Leaderboard;