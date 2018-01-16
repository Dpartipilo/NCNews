const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { TopicSchema, CommentSchema } = require('../models/models.js');


function getAllTopics(req, res, next) {
  TopicSchema.find({})
    .then(topics => {
      res.send(topics);
    })
    .catch(err => {
      next(err);
    });
}

module.exports = { getAllTopics };