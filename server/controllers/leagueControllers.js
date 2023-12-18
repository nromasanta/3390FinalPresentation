const League = require ('../models/leagueModel')
const mongoose = require('mongoose')
// get all leagues
const getAllLeagues = async (req, res) => {
    // const users = await User.find({ username: })
    // ^ for specific user
    const leagues = await League.find({}).sort({createdAt: -1})

    res.status(200).json(leagues)
}

// get a single user
const getSingleLeague = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such league'})
    }
    const league = await League.findById(id)

    if(!league) { 
        return res.status(404).json({error: 'League not found'})
    }

    res.status(200).json(league)
}


// create new league
const createLeague = async (req, res) => {
    const { leagueName, memberCount, commissionerName } = req.body
    // adding doc to db
    try {
        const league = await League.create({leagueName, memberCount, commissionerName})
        
        res.status(200).json(league)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

    //res.json({mssg:'POST a new user'})
}


// delete a user
const deleteLeague = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such league'})
    }

    const league = await League.findOneAndDelete({_id: id})

    if(!league) { 
        return res.status(400).json({error: 'League not found'})
    }

    res.status(200).json(league)


}

// update a user
const updateLeague = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such league'})
    }

    const league = await League.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!league) {
        return res.status(400).json({error: "No such league"})
    }

    res.status(200).json(league)

}


module.exports = {
    getAllLeagues,
    getSingleLeague,
    createLeague,
    deleteLeague,
    updateLeague

}