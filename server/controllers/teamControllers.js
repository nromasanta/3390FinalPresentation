const Team = require('../models/teamModel')
const mongoose = require('mongoose')

// note that req.params is the route parameter and usually has to do
// with URL

// req.body is receiving what is sent then updating to mongodb

// use params to find what you need, use body to extract the resource



// get all users
const getAllTeams = async (req, res) => {
    // const users = await User.find({ username: })
    // ^ for specific user
    const teams = await Team.find({}).sort({createdAt: -1})

    res.status(200).json(teams)
}

// get a single user
const getSingleTeam= async (req, res) => {
    const {id} = req.params

 
    const team = await Team.findById(id)

    if(!team ) { 
        return res.status(404).json({error: 'Team not found'})
    }

    res.status(200).json(team)
}


// create new user
const createTeam = async (req, res) => {
    const {teamName, wins, losses, skillIndex} = req.body
    // adding doc to db

    console.log("In here!")
    try {
        const team = await Team.create({teamName, wins, losses, skillIndex})
        
        res.status(200).json(team)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

    //res.json({mssg:'POST a new user'})
}


// delete a user
const deleteTeam = async (req, res) => {
    const {id} = req.params

    const team = await Team.findOneAndDelete({_id: id})

    if(!team) { 
        return res.status(400).json({error: 'Team not found'})
    }

    res.status(200).json(team)


}

// update a user
const updateTeam = async (req, res) => {
    const {id} = req.params

    const team = await Team.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!team) {
        return res.status(400).json({error: "No such team"})
    }

    res.status(200).json(team)

}

// update a team's bets

const updateBets = async (req, res) => {
    const teamId = req.params.id;
    const { betAmount } = req.body; 
    // try block cause if it isnt populated we gotta bounce
    try {
      const team = await Team.findById(teamId);

  
      team.totalBets += betAmount; 
      const updatedTeam = await team.save();
  
      res.status(200).json({
        message: 'Bet updated successfully',
        
      });
    } catch (error) {
      console.error('Error updating bets:', error);
      res.status(500).json({ message: 'Error updating bets' });
    }
  };

  // clean up a team's bets
  const resetBets = async (req, res) => {
    const teamId = req.params.id; 
  
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      team.totalBets = 0;
      const updatedTeam = await team.save();
  
      res.status(200).json({
        message: 'End of day: Bet Cleanup Complete',
        team: updatedTeam
      });
    } catch (error) {
      console.error('Error = End of day: Bet Cleanup Complete', error);
      res.status(500).json({ message: 'Error cleaning up bets' });
    }
  };




module.exports = {
    getAllTeams,
    getSingleTeam,
    createTeam,
    deleteTeam,
    updateTeam,
    updateBets,
    resetBets
}