import React, { createContext, useState, useEffect } from 'react';
import usePageNavigator from './usePageNavigator';

//ref
// https://www.loginradius.com/blog/engineering/react-context-api/
// since this surrounds our entire application, we initialize 
// the user context with null
// use this page to set the state across all pages


const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        try {
          const response = await fetch(`http://localhost:4000/api/users/byUsername/${storedUsername}`);
          const userData = await response.json();
          if (response.ok) {
            console.log("inside usercontext we are good")
            setUser(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, []); // runs once, no dependencies in the [], which means that there is no variable that, when changed,
  // will cause this to run again 

  // on login, we set the context
  const login = (userData) => {
    setUser(userData);
    // local storage to keep when leaving
    localStorage.setItem('username', userData.username);
  };

  // on logout, clear the context
  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  // give every page ({children}) access to these values as well as the context
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;