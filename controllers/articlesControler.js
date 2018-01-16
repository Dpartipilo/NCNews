const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { Articles } = require('../models/models.js');

function getAllArticles(req, res, next) {
  Articles.find()
    .then(articles => {
      if (articles.length === 0) {
        return next({ type: 404 });
      }
      res.send(articles);
    });
}

module.exports = { getAllArticles };