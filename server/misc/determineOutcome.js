// DetermineOutcome.js
// NOTE THAT THIS NEEDS TO BE JS
// SERVER.JS DOES NOT USE ES6!!!!!!
const teamModel = require('../models/teamModel');
const DailyMatches = require('../models/dailyMatchModel');
const UserBet = require('../models/betModel'); 
const { calculateOdds, calculatePayout } = require('./bettingOdds'); // Adjust path if needed
const UserModel = require('../models/userModel');

// generates a positive or negative one integer 
const signFactor1 = Math.round(Math.random()) * 2 - 1;
const signFactor2 = Math.round(Math.random()) * 2 - 1;
const signFactor3 = Math.round(Math.random()) * 2 - 1;
const signFactor4 = Math.round(Math.random()) * 2 - 1;

// multiply luck factor by the sign factor
const luckFactor1 = Math.random() * 500 * signFactor1;
const luckFactor2 = Math.random() * 500 * signFactor2;
const luckFactor3 = Math.random() * 500 * signFactor3;
const luckFactor4 = Math.random() * 500 * signFactor4;



const determineOutcome = async () => {
  try {
    const dailyMatch = await DailyMatches.findOne(); // Fetch the daily match
    if (!dailyMatch) {
      console.log("No daily match found for today.");
      return;
    }

    const team1 = await teamModel.findById(dailyMatch.team1);
    const team2 = await teamModel.findById(dailyMatch.team2);
    const team3 = await teamModel.findById(dailyMatch.team3);
    const team4 = await teamModel.findById(dailyMatch.team4);

    const team1score = team1.skillIndex + luckFactor1;
    const team2score = team2.skillIndex + luckFactor2;
    const team3score = team3.skillIndex + luckFactor3;
    const team4score = team4.skillIndex + luckFactor4;
    console.log(`luckfactor1: ${luckFactor1} luckfactor2: ${luckFactor2} signFactor1: ${signFactor1} signFactor2: ${signFactor2}`);

    let winner1, loser1;
    if (team1score > team2score) {
      winner1 = team1;
      loser1 = team2;
    } else {
      winner1 = team2;
      loser1 = team1;
    }

    winner1.wins += 1;
    winner1.skillIndex += 50;
    loser1.losses += 1;
    if(loser1.skillIndex > 1000) {
      loser1.skillIndex -= 50;
    }
    await winner1.save();
    await loser1.save();

    let winner2, loser2;
    if (team3score > team4score) {
      winner2 = team3;
      loser2 = team4;
    } else {
      winner2 = team4;
      loser2 = team3;
    }

    winner2.wins += 1;
    loser2.losses += 1;
    await winner2.save();
    await loser2.save();

    // dailyMatch.winner = winner._id;
    // await dailyMatch.save();

    console.log(`Match outcome determined. Winner: ${winner1.teamName}`);
    console.log(`Match outcome determined. Winner: ${winner2.teamName}`);
  

  

    const userBets = await UserBet.find({}); // get all the bets
    console.log("User bets found:", userBets.length); // number of bets found
    // useful for debugging to seee if we're actually grabbing everything


    for (const bet of userBets) {
      console.log("Done running outcome calculations");
      let payout = 0;
  
      // refresher:
      // winner1 is the winner of team1 vs team2
      // group1.teamId will ALWAYS contain the teamId of who the user bet on

      // bet on group 1 and the bet was on the winning team
      const oddsGroup1 = calculateOdds(team1.skillIndex, team2.skillIndex);
      const oddsGroup2 = calculateOdds(team3.skillIndex, team4.skillIndex);
      console.log(oddsGroup1, oddsGroup2);
      // check if the user bet on group 1 and if the bet was on the winning team
      if (bet.group1 && bet.group1.teamId && bet.group1.teamId.equals(winner1._id)) {
        console.log(`User bet on winning team in G1: ${bet.group1.teamId}`)
        if (bet.group1.teamId.equals(team1._id)) {
          payout += Math.round(calculatePayout(bet.group1.betAmount, oddsGroup1.oddsTeam1));
        } else {
          payout += Math.round(calculatePayout(bet.group1.betAmount, oddsGroup1.oddsTeam2));
        }
        console.log(`group 1 payout for user ${bet.userId}: ${payout}`);
      }
    
      // ccheck if the user bet on group 2 and if the bet was on the winning team
      if (bet.group2 && bet.group2.teamId && bet.group2.teamId.equals(winner2._id)) {
        console.log(`User bet on winning team in G2: ${bet.group2.teamId}`)
        if (bet.group2.teamId.equals(team3._id)) {
          payout += Math.round(calculatePayout(bet.group2.betAmount, oddsGroup2.oddsTeam1));
        } else {
          payout += Math.round(calculatePayout(bet.group2.betAmount, oddsGroup2.oddsTeam2));
        }
        console.log(`group 2 payout for user ${bet.userId}: ${payout}`);
      }
      const user = await UserModel.findById(bet.userId);
      if (user) {
        user.points += payout; 
        await user.save();
        console.log(`Payout of ${payout} points added to user ${user.username}`);
      } else {
        console.error(`User not found for ID: ${bet.userId}`);
      }
  
      
      console.log(`processed payout for user ${bet.userId}: ${payout}`);
    }
} catch (error) {
  console.error("Error determining match outcome and processing payouts:", error);
}
};


module.exports = determineOutcome;