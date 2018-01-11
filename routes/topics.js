const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from topics');
});


// GET /api/topics
// Get all the topics

// GET /api/topics/:topic_id/articles
// Return all the articles for a certain topic

module.exports = router;