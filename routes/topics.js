const router = require('express').Router();

const { getAllTopics } = require('../controllers/topicsController');

// GET /api/topics
// Get all the topics
router.get('/', getAllTopics);

// GET /api/topics/:topic_id/articles
// Return all the articles for a certain topic

module.exports = router;