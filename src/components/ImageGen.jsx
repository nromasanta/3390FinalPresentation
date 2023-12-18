
import React from 'react';
import i404 from '../assets/i404.png';
import angel from '../assets/angel.png';
import Diamond from '../assets/Diamond_Dogs.png';
import good from '../assets/good.png';
import hunter from '../assets/hunter.png';
import pollos from '../assets/pollos.png';
import runner from '../assets/runner.png';
import solid from '../assets/solid.png';
import thief from '../assets/thief.png';
import tragic from '../assets/tragic.png';
const teamImages = {
    'Team Solo Good': good,
    'Team Roadrunner': runner,
    'Team Solid': solid,
    '99 Thieves': hunter,
    'Team 404': i404,
    'Team Tragic': tragic,
    'Los Pollos Hermanos': pollos,
    'Los Angeles Angels': angel,
    'Diamond Dogs': Diamond,
    'The Vault Hunters': thief,
  };


  //reference this:
  //https://stackoverflow.com/questions/67152324/how-to-dynamically-render-images-in-react
  const ImageGen = ({ name }) => {
    console.log(name);
    const image = teamImages[name] 
    
    return ( <img src={image} alt={name} className=" w-32 h-auto mx-auto mt-auto pt-14" />);
  };
  
  export default ImageGen;