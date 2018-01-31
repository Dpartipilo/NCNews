const mongoose = require("mongoose");
mongoose.Promise = Promise;

const { TopicSchema, ArticleSchema } = require("../models");

function getAllTopics(req, res, next) {
  TopicSchema.find({})
    .then(topics => {
      res.status(200).send(topics);
    })
    .catch(err => {
      return next(err);
    });
}

function getAllArticlesByTopic(req, res, next) {
  const { topic_id } = req.params;
  ArticleSchema.find({ from_topic: topic_id })
    .then(articles => {
      if (articles.length === 0)
        return next({ status: 404, message: "TOPIC NOT FOUND" });
      res.status(200).send(articles);
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = { getAllTopics, getAllArticlesByTopic };
