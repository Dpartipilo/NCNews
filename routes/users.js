const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from users');
});

// GET /api/users/:username
// Returns a JSON object with the profile data for the specified user.

module.exports = router;