const router = require('express').Router();
const { getArticleById, getAllArticles, getAllCommentsByArticle, addCommentsToArticle, articleVote } = require('../controllers/articlesControler');

// GET /api/articles
// Returns all the articles
router.get('/', getAllArticles);

router.route('/:article_id')
  // GET /api/articles/:article_id
  // Get an article by id
  .get(getArticleById)

  // PUT /api/articles/:article_id
  // Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
  // e.g: /api/articles/:article_id?vote=up
  .put(articleVote);

router.route('/:article_id/comments')
  // GET /api/articles/:article_id/comments
  // Get all the comments for a individual article
  .get(getAllCommentsByArticle)

  // POST /api/articles/:article_id/comments
  // Add a new comment to an article. This route requires a JSON body with a comment key and value pair
  // e.g: {"comment": "This is my new comment"}
  .post(addCommentsToArticle);


module.exports = router;