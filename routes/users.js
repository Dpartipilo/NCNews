const router = require('express').Router();

const { getAllUsers, getUserByUsername} = require('../controllers/userController');

//GET /api/users
router.get('/', getAllUsers);

// GET /api/users/:username
// Returns a JSON object with the profile data for the specified user.
router.get('/:username', getUserByUsername);

module.exports = router;