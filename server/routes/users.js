const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    getByUsername
} = require('../controllers/userControllers')


const router = express.Router()

// get by username
router.get('/byUsername/:username', getByUsername)

router.get('/', getAllUsers)

//GET a single user
router.get('/:id', getSingleUser)

//POST a new user
router.post('/', createUser)

//DELETE a new user
router.delete('/:id', deleteUser)

//POST a new user
router.patch('/:id', updateUser)

//Logging in a user 
router.post('/login', loginUser);



module.exports = router