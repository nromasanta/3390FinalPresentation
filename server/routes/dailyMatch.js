const Match = require('../models/dailyMatchModel'); 
const Team = require('../models/teamModel');
const express = require('express')
const router = express.Router();
// get today's matches, this is the only reason we should need to access the match 
// collection

// didn't bother putting this in a controller since we only need one, might
// consider consolidating into a controller for consistency but for now let's get it to work...

router.get('/', async (req, res) => {
  try {
    const match = await Match.findOne({ gameNo: 1 })
                              .populate('team1')
                              .populate('team2')
                              .populate('team3')
                              .populate('team4')
                              .exec(); 

    if (match) {
      // console.log("Found!", match);
      res.json(match); 
    } else {
      res.status(404).json({ message: 'No match found for today' });
    }
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ message: 'Error fetching match' });
  }
})

module.exports = router