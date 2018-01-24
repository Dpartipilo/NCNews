const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { CommentSchema } = require('../models/models.js');

function commentVote(req, res, next) {
  const { comment_id } = req.params;
  const vote = req.query.vote.toLowerCase();
  if (vote !== 'up' && vote !== 'down') {
    return next({ status: 400, message: 'Bad request' });
  }
  CommentSchema.findByIdAndUpdate(comment_id, {
    $inc: { votes: vote === 'up' ? 1 : -1 }
  },
    { new: true })
    .then(comment => {
      res.status(202).send({ message: 'Comment voted!', comment });
    })
    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, message: 'COMMENT_ID NOT FOUND' });
      return next(err);
    });
}

function commentDelete(req, res, next) {
  const { comment_id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(comment_id)) {
    return next({ status: 400, message: `Invalid comment_id: ${comment_id}` });
  }
  CommentSchema.findByIdAndRemove(comment_id)
    .then(comment => {
      let response = {
        message: `Comment: ${comment_id} successfully deleted`
      };
      if (!comment) return next({ status: 404, message: 'COMMENT_ID NOT FOUND' });
      res.status(204).send(response);
    })

    .catch(err => {
      if (err.name === 'CastError') return next({ status: 404, message: 'COMMENT_ID NOT FOUND' });
      return next(err);
    });
}

module.exports = { commentVote, commentDelete };