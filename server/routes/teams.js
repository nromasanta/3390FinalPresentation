const express = require('express')
const {
    getAllTeams,
    getSingleTeam,
    createTeam,
    deleteTeam,
    updateTeam,
    updateBets,
    resetBets
} = require('../controllers/teamControllers')



const router = express.Router()


router.get('/', getAllTeams)

//GET a single team
router.get('/:id', getSingleTeam)

//POST a new team
router.post('/', createTeam)

//DELETE a new teamn
router.delete('/:id', deleteTeam)

//POST a new team
router.patch('/:id', updateTeam)

router.patch('/team/:id/bet', updateBets);

router.patch('/team/:id/resetbets', resetBets)


module.exports = router