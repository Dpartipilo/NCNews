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
  let topic_id = req.params.topic_id;
  TopicSchema.findById(topic_id)
    .then(() => {
      return ArticleSchema.find()
        .then(articles => {
          res.send(articles);
        })
        .catch(err => {
          next(err);
        });
    });
}

module.exports = { getAllTopics, getAllArticlesByTopic };