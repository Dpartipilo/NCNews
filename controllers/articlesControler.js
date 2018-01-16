const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { ArticleSchema, TopicSchema, CommentSchema, UserSchema } = require('../models/models.js');

function getAllArticles(req, res, next) {
  ArticleSchema.find()
    .then(articles => {
      if (articles.length === 0) return next({ type: 404 });
      res.send(articles);
    })
    .catch(err => {
      next(err);
    });
}

function getAllCommentsByArticle(req, res, next) {
  let article_id = req.params.article_id;
  ArticleSchema.findById(article_id)
    .then(() => {
      return CommentSchema.find();
    }).then(comments => {
      res.send(comments);
    })
    .catch(err => {
      next(err);
    });
}




module.exports = { getAllArticles, getAllCommentsByArticle };