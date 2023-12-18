//import logo from './logo.svg';
import {useEffect, useState} from 'react';
import LeagueDetails from '../components/LeagueDetails';
//import useFetch from '../components/useFetch';
import Navbar from '../components/Navbar'
// Page displaying all the active leagues on the application


function League() {
  const [leagues, setLeagues] = useState(null)
  useEffect(() => {
    
    const fetchLeagues = async() => {
      const response = await fetch('http://localhost:4000/api/leagues')
      const json = await response.json()

      if (response.ok){
        setLeagues(json)
      }
    }

    fetchLeagues()
  }, [])

  return (

    <main className="main-content">
      <Navbar callerPage="League" />
      <div>
        {leagues && leagues.map((league) => (
          <LeagueDetails key = {league._id} league = {league} />
        ))}
    

    </div>
    </main>


  )
}

export default League;