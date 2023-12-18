const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const leagueSchema = new Schema({
    leagueName: {
        type: String,
        required:true
    },
    memberCount: {
        type: Number,
        required: true
    },
    commissionerName: {
        type: String,
        required: true
    },
    pointTotal: {
        type: Number,
        required: true
    }
}, {timestamps : true})

module.exports = mongoose.model('League', leagueSchema)