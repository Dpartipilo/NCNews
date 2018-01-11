const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from articles');
});


// GET /api/articles
// Returns all the articles


// GET /api/articles/:article_id/comments
// Get all the comments for a individual article

// POST /api/articles/:article_id/comments
// Add a new comment to an article. This route requires a JSON body with a comment key and value pair
// e.g: {"comment": "This is my new comment"}

// PUT /api/articles/:article_id
// Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
// e.g: /api/articles/:article_id?vote=up


module.exports = router;