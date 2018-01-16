const router = require('express').Router();

const { getAllUsers } = require('../controllers/userController');
// GET /api/users/:username
// Returns a JSON object with the profile data for the specified user.
router.get('/', getAllUsers);

module.exports = router;