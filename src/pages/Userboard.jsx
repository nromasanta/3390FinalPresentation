
import {useEffect, useState} from 'react';
//import useFetch from '../components/useFetch';
import Navbar from '../components/Navbar'
import UserDetails from '../components/UserDetails';
// Page displaying all the active leagues on the application


function Userboard() {

  
  const [users, setUsers] = useState(null)
  useEffect(() => {
    
    const fetchUsers = async() => {
      const response = await fetch('http://localhost:4000/api/users')
      const json = await response.json()

      if (response.ok){
        const sortedUsers = [...json].sort((a,b) => b.points - a.points);
        setUsers(sortedUsers)
      }
    }

    fetchUsers()
  }, [])

  return (

    <main className="main-content">
      <Navbar callerPage="Userboard" />
      <div className = "mt-5 min-w-fit text-2xl"> 
      <h1 className = "text-center font-extrabold text-6xl my-8">Leaderboard</h1>
      {/* Think of mapping like a for loop, where index is the iteration and starts at 0 */}
        {users && users.map((user, index) => (
          <UserDetails key = {user._id} user = {user} position = {index + 1} />
        ))}
    </div>
    </main>


  )
}

export default Userboard;