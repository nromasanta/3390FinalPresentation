const User = require ('../models/userModel')
const mongoose = require('mongoose')
// get all users
const getAllUsers = async (req, res) => {
    // const users = await User.find({ username: })
    // ^ for specific user
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a single user
const getSingleUser = async (req, res) => {
    const {id} = req.params

    // validate id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findById(id)

    if(!user) { 
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}


// create new user
const createUser = async (req, res) => {
    let {username, password, points, leagueName} = req.body
    points = 1000;
    // adding doc to db
    try {
        const user = await User.create({username, password, points, leagueName})
        
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

    //res.json({mssg:'POST a new user'})
}


// delete a user
const deleteUser = async (req, res) => {
    const {id} = req.params

    //validate id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) { 
        return res.status(400).json({error: 'User not found'})
    }

    res.status(200).json(user)


}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params;

    //validate id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    // try block cause this might not work
    try {
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update bet status and amount for group 1 if provided in the request body
        if (req.body.group1BetStatus !== undefined) {
            user.group1BetStatus = req.body.group1BetStatus;
        }
        if (req.body.group1BetAmount !== undefined) {
            user.group1BetAmount = req.body.group1BetAmount;
        }

        // Update bet status and amount for group 2 if provided in the request body
        if (req.body.group2BetStatus !== undefined) {
            user.group2BetStatus = req.body.group2BetStatus;
        }
        if (req.body.group2BetAmount !== undefined) {
            user.group2BetAmount = req.body.group2BetAmount;
        }

        // update points regardless
        if (req.body.points !== undefined) {
            user.points = req.body.points;
        }

        // Save the updated user data
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // grab the username and password entered from the request
    try {
        // wait till we find one
      const user = await User.findOne({ username });
      if (user && user.password === password) { 
        // repsonse time :)
        res.json({ message: 'Login successful', username });
      } else { // response time :(
        res.status(401).json({ message: 'Login failed' });
      }
    } catch (error) {
        // response time :(
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getByUsername = async (req,res) => {
    // trying diff method gathering from the request body
    // console.log("inside get by username");
    try {
        // waiting to find a user, take the username from the request params
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
;}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    getByUsername

}