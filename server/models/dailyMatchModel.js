const mongoose = require('mongoose');


// notes:
// type references another object
// references the team model
const dailyMatchSchema = new mongoose.Schema({
  date: {
    type: Date,
    // This unique field caused issues, but eventually we want to try and make this work...   
    // unique: true,
    required: true
  },
  team1: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team'
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  team3: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  team4: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  // used to easier reference this document, should always be 1
  gameNo: {
    type: Number,
    required: true
  }
});

const DailyMatches = mongoose.model('DailyMatches', dailyMatchSchema);

module.exports = DailyMatches;