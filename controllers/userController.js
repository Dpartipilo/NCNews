const mongoose = require('mongoose');
mongoose.Promise = Promise;

const { UserSchema } = require('../models/models.js');

function getAllUsers(req, res, next) {
  UserSchema.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      next(err);
    });
}

function getUserByUsername(req, res, next) {
  let username = req.params.username;
  UserSchema.findOne({ username })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      next(err);
    });
}

module.exports = { getAllUsers, getUserByUsername };