const calculateOdds = (skillIndexTeam1, skillIndexTeam2) => {
    const skillDifference = skillIndexTeam1 - skillIndexTeam2;
    const maxSkillDifference = 1000; //can't be too good otherwise it's a wrap
  
    
    // positive = first team good
    // negative = second team good
    // The probability is scaled between 0.1 and 0.9 
    let winProbabilityTeam1 = 0.5 + (skillDifference / maxSkillDifference) / 2;
    // winProbabilityTeam1 = Math.max(0.1, Math.min(0.9, winProbabilityTeam1)); // Ensuring it stays between 0.1 and 0.9
  
 
    const winProbabilityTeam2 = 1 - winProbabilityTeam1;
  
    // convert probabilities to odds.
    const oddsTeam1 = 1 / winProbabilityTeam1;
    const oddsTeam2 = 1 / winProbabilityTeam2;
  
    return { oddsTeam1, oddsTeam2 };
  }
  
  // Function to calculate the payout for a winning bet.
  // Returns the payout amount.

  const calculatePayout = (betAmount, odds) => {
    return Math.round(betAmount * odds);
  }
  
  module.exports = { calculateOdds, calculatePayout };