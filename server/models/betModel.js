const mongoose = require('mongoose');

// this is pretty much gonna be almost all references except bet amount
const userBetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    group1: { 
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        betAmount: Number
    },
    group2: {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        betAmount: Number
    }
});

module.exports = mongoose.model('UserBet', userBetSchema);