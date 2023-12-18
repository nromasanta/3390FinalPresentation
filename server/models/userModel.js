const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    leagueName: {
        type: String,
        required: false
    },
   group1BetStatus: {
        type: Boolean,
        default: false
   },
   group2BetStatus: { 
    type: Boolean,
    default: false
   },
   group1BetAmount: {
        type: Number,
        default: 0
   },
   group2BetAmount: {
    type: Number,
    default: 0
}
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema)