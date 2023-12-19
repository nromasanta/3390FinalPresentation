const calculateOdds = (skillIndexTeam1, skillIndexTeam2) => {
    // all of these are totally made up
    // and not based in any real
    // calculations of betting ods
    // but it kind of makes sense?
    const skillDifference = skillIndexTeam1 - skillIndexTeam2;
    const skillDivisor = 1000; 
    
    // positive = first team good
    // negative = second team good
  
    let winProbabilityTeam1 = (skillDifference / skillDivisor) / 2;
    
  
    // second team just subtract 1 from the probability of team 1, so we can get 
    // a percentage again
    const winProbabilityTeam2 = 1 - winProbabilityTeam1;
  
    // convert probabilities to odds.
    const oddsTeam1 = 1 / winProbabilityTeam1;
    const oddsTeam2 = 1 / winProbabilityTeam2;
  
    return { oddsTeam1, oddsTeam2 };
  }
  
  // Function to calculate the payout for a winning bet.
  // Returns the payout amount.

  const calculatePayout = (betAmount, odds) => {
    return Math.round(betAmount * odds); // bunch of decimals if we don't ues math.round
  }
  
  module.exports = { calculateOdds, calculatePayout };