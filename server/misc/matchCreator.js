const Team = require('../models/teamModel'); 
const Match = require('../models/dailyMatchModel'); 


// this should be fine do not touch
const selectRandomTeams = async () => {

    // I don't think that sample will get the same team twice, keep an eye on this
    
    
    console.log("Grabbing teams...");
    const teams = await Team.aggregate([{ $sample: { size: 4 } }]); // grab four. two games a day
    console.log('Done grabbing teams, returning:', teams.map(team => team._id));
    return teams;
};
// XX MARKED FOR TESTING
// 
const createDailyMatch = async (teams) => { 
    console.log("Creating match");
    // didn't need to make this a separate function but had issues consolidating 
    // it into a single one so oh well

    try {
    // the teams object we pass in is an ARRAY, keep that in mind

    //store the match data

    // 1st match
    const matchData = {
        date: new Date(),
        team1: teams[0]._id, 
        team2: teams[1]._id, 
        team3: teams[2]._id,
        team4: teams[3]._id,
        gameNo: 1
    };




    // Create two match entries for the day
    await Match.create(matchData);
        console.log("Done Creating Matches");
    } catch(error) {
        console.error("Error creating match:", error);
    }
    };

module.exports = {
    selectRandomTeams,
    createDailyMatch
};


