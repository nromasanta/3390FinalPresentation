const User = require('../models/userModel'); 
const updateMassive = async () => {
  try {
    // console.log("in bhere");
    await User.updateMany({}, { // no requirements, take them all
      $set: {
       points:500
      }
    });
    console.log('All user given 500 points.');
  } catch (error) {
    console.error('Error giving points:', error);
  }
};

module.exports = updateMassive;