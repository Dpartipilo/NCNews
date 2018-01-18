const router = require('express').Router();

const { commentVote } = require('../controllers/commentsController');

// PUT /api/comments/:comment_id
// Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
// e.g: /api/comments/:comment_id?vote=down
router.put('/:comment_id', commentVote);

// DELETE /api/comments/:comment_id
// Deletes a comment


module.exports = router;