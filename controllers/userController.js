const mongoose = require("mongoose");
mongoose.Promise = Promise;

const { UserSchema } = require("../models/models.js");

function getAllUsers(req, res, next) {
  UserSchema.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      return next(err);
    });
}

function getUserByUsername(req, res, next) {
  let { username } = req.params;
  UserSchema.findOne({ username })
    .then(user => {
      if (user === null)
        return next({ status: 404, message: "USERNAME NOT FOUND" });
      res.status(200).send(user);
    })
    .catch(err => {
      return next(err);
    });
}

module.exports = { getAllUsers, getUserByUsername };
