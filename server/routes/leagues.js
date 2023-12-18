const express = require('express')
const {
    getAllLeagues,
    getSingleLeague,
    createLeague,
    deleteLeague,
    updateLeague
} = require('../controllers/leagueControllers')


const router = express.Router()


router.get('/', getAllLeagues)

//GET a single user
router.get('/:id', getSingleLeague)

//POST a new user
router.post('/', createLeague)

//DELETE a new user
router.delete('/:id', deleteLeague)

//POST a new user
router.patch('/:id', updateLeague)
module.exports = router