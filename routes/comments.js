const router = require('express').Router();

const { commentVote, commentDelete } = require('../controllers/commentsController');

router.route('/:comment_id')
  // PUT /api/comments/:comment_id
  // Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
  // e.g: /api/comments/:comment_id?vote=down
  .put(commentVote)

  // DELETE /api/comments/:comment_id
  // Deletes a comment
  .delete(commentDelete);

module.exports = router;