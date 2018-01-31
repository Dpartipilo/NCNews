const router = require('express').Router();
const {
  getAllTopics,
  getAllArticlesByTopic
} = require('../controllers/topicsController');

router.get('/', getAllTopics);
router.get('/:topic_id/articles', getAllArticlesByTopic);

module.exports = router;
