
const express = require('express');
const router = express.Router();
const {
  placeBet,
  getUserBets,

} = require('../controllers/userBetController');

// Route to place a bet
router.post('/place', placeBet);

// Route to get user bets, good for payoutss
router.get('/:userId', getUserBets);

module.exports = router;