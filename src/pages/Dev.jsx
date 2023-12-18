import {useEffect, useState} from 'react';
//import usePageNavigator from '../components/usePageNavigator';
// Login page
import UserDetails from '../components/UserDetails'

function Dev() {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    
    const fetchUsers = async() => {
      const response = await fetch('http://localhost:4000/api/users')
      const json = await response.json()

      if (response.ok){
        setUsers(json)
      }
    }

    fetchUsers()
  }, [])

  return (

    <main className="main-content">
      <div>
        {users && users.map((user) => (
          <UserDetails key = {user._id} user = {user} />
        ))}
    

    </div>
    </main>


  )
}

export default Dev;