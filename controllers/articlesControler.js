const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { ArticleSchema, CommentSchema } = require('../models/models.js');

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

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  ArticleSchema.findById(article_id)
    .then(article => {
      res.send(article);
    })
    .catch(err => {
      return next(err);
    });
}

function getAllCommentsByArticle(req, res, next) {
  let { article_id } = req.params;
  CommentSchema.find({ from_topic: article_id })
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ error: err });
      else next(err);
    });
}

function addCommentsToArticle(req, res, next) {
  let article_id = req.params.article_id;
  ArticleSchema.findById(article_id)
    .then(() => {
      return new CommentSchema({
        created_by: req.body.created_by,
        body: req.body.body,
        from_topic: req.params.article_id
      });
    })
    .then((comment) => {
      comment.save();
      res.status(201).send(comment);
    })
    .catch(err => {
      next(err);
    });
}

function articleVote(req, res, next) {
  let article_id = req.params.article_id;
  let vote = 0;
  if (req.query.vote.toLowerCase() === 'up') vote += 1;
  else if (req.query.vote.toLowerCase() === 'down') vote -= 1;

  ArticleSchema.findByIdAndUpdate(article_id, { $inc: { votes: vote } }, { new: true })
    .then(article => {
      res.status(202).send({ message: 'Article voted!', article });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ error: err });
      else next(err);
    });
}

module.exports = { getAllArticles, getArticleById, getAllCommentsByArticle, addCommentsToArticle, articleVote };