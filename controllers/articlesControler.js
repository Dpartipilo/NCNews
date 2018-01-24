const mongoose = require('mongoose');

const { ArticleSchema, CommentSchema } = require('../models/models.js');

function getAllArticles(req, res, next) {
  ArticleSchema.find()
    .then(articles => {
      res.send(articles);
    })
    .catch(err => {
      return next(err);
    });
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;

  // console.log(article_id)

  if (!mongoose.Types.ObjectId.isValid(article_id)) {
    return next({ status: 400, message: `Invalid article_id: ${article_id}` });
  }

  ArticleSchema.findById(article_id)
    .then(article => {
      if (article === null) return next({ status: 404, message: 'ARTICLE_ID NOT FOUND' });
      res.send(article);
    })
    .catch(err => {
      return next(err);
    });
}

function getAllCommentsByArticle(req, res, next) {
  const { article_id } = req.params;
  CommentSchema.find({ from_topic: article_id })
    .then(comments => {
      res.status(200).send(comments);
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, message: 'ARTICLE_ID NOT FOUND' });
      return next(err);
    });
}

function addCommentsToArticle(req, res, next) {
  const { article_id } = req.params;
  const { created_by, body } = req.body;

  const newComment = new CommentSchema({
    created_by: created_by,
    body: body,
    from_topic: article_id,
    created_at: Date.now()
  });

  if (/^\W*$/.test(newComment.body)) return next({ status: 400, message: 'INVALID INPUT' });
  newComment.save()
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(err => {
      if (err.name === 'ValidationError') next({ status: 400, message: 'INVALID INPUT' });
      return next(err);
    });
}

function articleVote(req, res, next) {
  let { article_id } = req.params;
  const vote = req.query.vote.toLowerCase();

  if (vote !== 'up' && vote !== 'down') {
    return next({ status: 400, message: 'Bad request' });
  }

  ArticleSchema.findByIdAndUpdate(article_id, {
    $inc: {
      votes: vote === 'up' ? 1 : -1
    }
  }, { new: true })
    .then(article => {
      res.status(202).send({ message: 'Article voted!', article });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, message: 'ARTICLE_ID NOT FOUND' });
      return next(err);
    });
}

module.exports = { getAllArticles, getArticleById, getAllCommentsByArticle, addCommentsToArticle, articleVote };