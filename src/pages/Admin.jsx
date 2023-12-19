//import logo from './logo.svg';
//import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import MemberList from '../components/MemberList';
import useFetch from '../components/useFetch';
import Navbar from '../components/Navbar';
// This page is a league comissioner's dashboard
// Here they can kick members from their league,
// going to need invite functionality later

// IF ERROR:
// Create a second terminal and run this alongside 
// another terminal running `npm start`
// 
// Using a temporary json server to store mock data until
// we get MongoDB up and running


// RUN THIS WHILE IN THE PARENT DIRECTORY: 
// npx json-server --watch src/backend/db.json --port 8000


// XX UNUSED

function Admin() {
  const { data: members, isPending, error } = useFetch('http://localhost:8000/members');
  




  return (

    <div className="app-container">
      <Navbar callerPage = "Admin" />
    <aside className="sidebar-admin">
      <div className="site-icon"> (Placeholder) </div>
      <div className="admin-username">(Placeholder)</div>
      <div className="statistics"> (Placeholder) </div>
      <div className="user-reports"> (Placeholder) </div>
    </aside>
    <main className="main-content">
      { error && <div> { error } </div>}
      { isPending && <div> Loading Data...</div>}
      { members && <MemberList members = {members} />}
    </main>
  </div>

  );
}

export default Admin;