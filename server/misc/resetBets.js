const User = require('../models/userModel'); 
const UserBet = require('../models/betModel');
const resetUserBets = async () => {
  try {
    // console.log("in bhere");
    await User.updateMany({}, { // no requirements, take them all
      $set: {
        group1BetStatus: false,
        group2BetStatus: false,
        group1BetAmount: 0,
        group2BetAmount: 0
      }
    });
    console.log('All user bets have been reset.');
  } catch (error) {
    console.error('Error resetting user bets:', error);
  }
  try {
    // console.log("in bhere");
    await UserBet.deleteMany({});
    console.log('All bets have been cleared');
  } catch (error) {
    console.error('Error resetting user bets:', error);
  }
};

module.exports = resetUserBets;