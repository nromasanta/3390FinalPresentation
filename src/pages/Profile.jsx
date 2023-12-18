//import logo from './logo.svg';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

<FaceFrownIcon className="h-6 w-6 text-gray-500" />,


<EyeIcon className="h-6 w-6 text-gray-500" />,


<LockClosedIcon className="h-6 w-6 text-gray-500" />,


<UsersIcon className="h-6 w-6 text-gray-500" />,

<UserCircleIcon className="h-6 w-6 text-gray-500" />


function Profile() {
  // Sample user data (replace with actual user data)

  const { username } = useParams();

  const userData = {
    username: username,
    birthdate: '1990-01-01',
    leagueName: 'Example League',
  };

  const [profileImage, setProfileImage] = useState(null);

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  return (
    <main className="main-content">
      <Navbar callerPage="Profile" />

<div className = "super-container flex h-screen">
  
    <div className="profile-container flex-col p-10">
      <div className="profile-image">
        {/* <img src={profileImage || 'default-profile-image.jpg'} alt="Profile" /> */}
        <UserCircleIcon className="h-48 w-auto mx-auto text-gray-500" />
        {/* <input className = "text-xs pb-4 px-2" type="file" onChange={handleImageChange} accept="image/*" /> */}
      </div>

      <h2 className = "pb-4 text-center font-bold">{userData.username}</h2>

      <div className = "">
        <p className = "text-center">{userData.birthdate}</p>
        <p className = "text-center">{userData.leagueName}</p>
      </div>
    </div>

    <div className = "flex-col p-4 w-full">
      <h1 className = "bold text-xl text-gray-600 pl-8"> Welcome! </h1>


      <div className = "card-layout p-8 flex justify-between">
        <div className = "flex flex-col border-2 rounded-xl border-gray-500 h-52 w-52 justify-between items-center">
          <p className = "p-2 text-l text-center">Account Information</p>
          <UsersIcon className="h-32 w-auto max-auto text-gray-500" />
          <p className = "text-sm text-center p-2"> Public & Private Information</p>
        </div>
        <div className = "flex flex-col border-2 rounded-xl border-gray-500 h-52 w-52 justify-between items-center">
          <p className = "p-2 text-l text-center">Security</p>
          <LockClosedIcon className="h-32 w-auto mx-auto text-gray-500" />
          <p className = "text-sm text-center p-2"> Edit Password & Other Security Options</p>
        </div>
        <div className = "flex flex-col border-2 rounded-xl border-gray-500 h-52 w-52 justify-between items-center">
          <p className = "p-2 text-l text-center">Accessibility</p>
          <EyeIcon className="h-32 w-auto mx-auto text-gray-500" />
          <p className = "text-sm text-center p-2"> Site Theme, Text Size, & More</p>
        </div>
    
      </div>
      <div className = "card-layout p-8 flex justify-start">
        <div className = "flex flex-col border-2 rounded-xl border-gray-500 h-52 w-52 justify-between items-center">
          <p className = "p-2 text-l text-center">Deactivate Account</p>
          <FaceFrownIcon className="h-32 w-auto mx-auto text-gray-500" />
          <p className = "text-sm text-center p-2"> If you really want to...</p>
        
       
        </div>
    
      </div>




    </div>


</div>

    </main>
  );
}

export default Profile;