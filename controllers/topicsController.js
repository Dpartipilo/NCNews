const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { TopicSchema, ArticleSchema } = require('../models/models.js');

function getAllTopics(req, res, next) {
  TopicSchema.find({})
    .then(topics => {
      res.send(topics);
    })
    .catch(err => {
      next(err);
    });
}

function getAllArticlesByTopic(req, res, next) {
  const { topic_id } = req.params;
  ArticleSchema.find({ from_topic: topic_id })
    .then(articles => {
      if (articles.length === 0) return next({ status: 404, message: 'This topic doesn\'t exist' });
      res.status(200).send(articles);
    })
    .catch(err => {
      if (err) next(err);
    });
}

module.exports = { getAllTopics, getAllArticlesByTopic };