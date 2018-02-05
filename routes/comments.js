const router = require("express").Router();
const {
  commentVote,
  commentDelete
} = require("../controllers/commentsController");

router
  .route("/:comment_id")
  .put(commentVote)
  .delete(commentDelete);

module.exports = router;
