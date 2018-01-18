const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { CommentSchema } = require('../models/models.js');

function commentVote(req, res, next) {
  let comment_id = req.params.comment_id;
  let vote = 0;
  if (req.query.vote.toLowerCase() === 'up') vote += 1;
  else if (req.query.vote.toLowerCase() === 'down') vote -= 1;

  CommentSchema.findByIdAndUpdate(comment_id, { $inc: { votes: vote } }, { new: true })
    .then(comment => {
      res.status(202).send({ message: 'Comment voted!', comment });
    })
    .catch(err => {
      next(err);
    });
}

module.exports = { commentVote };