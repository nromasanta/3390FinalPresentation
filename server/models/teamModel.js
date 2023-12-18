const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const teamSchema = new Schema({
    teamName: {
        type: String,
        required:true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    skillIndex: {
        type: Number,
        required: true
    },
    totalBets: {
        type: Number,
        default: 0,
    }
}, {timestamps : true})

module.exports = mongoose.model('Team', teamSchema)