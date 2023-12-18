const UserBet = require('../models/betModel'); 


const placeBet = async (req, res) => {
    const { userId, teamId, betAmount, betGroup } = req.body;

    try {
        let betData = {}; // create empty betData object to store stuff
        if (betGroup === 1) { // if group one, createa field that reflects that
            betData = { group1: { teamId, betAmount } };
        } else if (betGroup === 2) {
            betData = { group2: { teamId, betAmount } };
        } else {
            return res.status(400).json({ error: 'Invalid bet group' });
        }
        
        // creating a new bet, with a structure identical to the model
        const newBet = new UserBet({
            userId,
            ...betData // append bet data
        });
        // save the bet, which will post bc of .save()
        await newBet.save();
        res.status(200).json(newBet); // get the status 
    } catch (error) { // uh oh 
        res.status(400).json({ error: error.message });
    }
};
const getUserBets = async (req, res) => {
    // get a user bet
    const { userId } = req.params;

    try {
        // find it based on a userID
        const userBets = await UserBet.find({ userId });
        res.status(200).json(userBets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
  placeBet,
  getUserBets
};