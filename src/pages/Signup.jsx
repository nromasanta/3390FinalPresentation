import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import usePageNavigator from '../components/usePageNavigator';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {handleGoToLogin} = usePageNavigator();
  let points = 500;


  const handleSignup = async (e) => {
    e.preventDefault()

    const user = {username, password, points}

    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      handleGoToLogin()
      setError(null)
      console.log('New User Added!')
    }
  }
 

  return (
    <main className="main-content">
      <Navbar callerPage="Signup" />

      <div className= "p-6 rounded-3xl shadow-lg mx-auto w-80 min-h-450">
        <h1 className = "text-xl text-center mb-4"> <b>Get Started with a Free Account </b></h1>
        <h4 className = "mb-6 text-center text-sm text-gray-600">Already have an account? 
        <span className = "text-red-600 cursor-pointer" onClick = {handleGoToLogin}> Log in here</span>
        </h4>

        <form>
          <label className = "block text-gray-600 text-sm font-semibold mb-2 p-2">
            Username:
            <input
              className = "border-b mb-2 bg-site-white block pl-1 py-1 font-light"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block text-gray-600 text-sm font-semibold mb-2 p-2">
            Password:
            <input
             className = "block border-b mb-2 bg-site-white pl-1 py-1 font-light"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className = "mt-6">
          <button
            type="button"
            onClick={handleSignup}
            className = "block p-2 mx-auto border rounded-2xl shadow-lg bg-red-500 text-white"
          >
            Sign Up
          </button>
          {error && <div className = "text-center text-red-500"> Error creating account - Please ensure all fields are filled out</div>}
          </div>
        </form>
      </div>


    </main>
  );
}

export default Signup;