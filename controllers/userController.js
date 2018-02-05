const mongoose = require("mongoose");
mongoose.Promise = Promise;

const { User } = require("../models");

function getAllUsers(req, res, next) {
  User.find()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      return next(err);
    });
}

function getUserByUsername(req, res, next) {
  let { username } = req.params;
  User.findOne({ username })
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
