const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from comments');
});

// PUT /api/comments/:comment_id
// Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
// e.g: /api/comments/:comment_id?vote=down

// DELETE /api/comments/:comment_id
// Deletes a comment


module.exports = router;