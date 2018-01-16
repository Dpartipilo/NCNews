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
module.exports = { getAllUsers };