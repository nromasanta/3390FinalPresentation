//import logo from './logo.svg';
import React, { useState, useContext} from 'react';
import Navbar from '../components/Navbar';
import usePageNavigator from '../components/usePageNavigator';
import UserContext from '../components/UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {login} = useContext(UserContext);

  const {handleGoToGames} = usePageNavigator();

  const handleLogin = async () => {
   
    // console.log('Entered username:', username);
    // console.log('Entered password:', password);
    try {

      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Fetch the full user data
        const userResponse = await fetch(`http://localhost:4000/api/users/byUsername/${username}`);
        if (userResponse.ok) {
          setError(null)
          const userData = await userResponse.json();
          login(userData); // Update context with full user data
          handleGoToGames();
        } else {
          setError(2)
          console.error('Failed to fetch user data');
        }
      } else {
        setError(2)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    <main className="main-content">
      <Navbar callerPage="Login" />

   
        <div className= "p-6 rounded-3xl shadow-lg mx-auto w-80 mt-24">
        <h1 className = "text-4xl text-center mb-4"><b>Login</b></h1>
        <h4 className = "mb-6 text-center text-xl text-gray-600">Sign in using username and password.</h4>
        
        <form>
          <label className = "block text-gray-600 text-sm font-semibold mb-2 p-2">
            Username:
            <input
              className = "block border-b mb-2 bg-site-white font-light pl-1 py-1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block text-gray-600 text-sm font-semibold mb-2 p-2">
            Password:
            <input
              className = "block border-b mb-2 bg-site-white font-light pl-1 py-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="button"
            onClick={handleLogin}
            className = "block p-2 mx-auto border rounded-2xl shadow-lg bg-red-500 text-white"
          >
            Login
          </button>
          {error && <div className = "text-center text-red-500"> Incorrect Username or Password</div>}
        </form>
        </div>
  
    </main>
  );
}

export default Login;