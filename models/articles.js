const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Article = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  from_topic: {
    type: String
  },
  votes: {
    type: Number,
    default: 0
  },
  created_by: {
    type: String,
    lowercase: true
  }
});

module.exports = mongoose.model("Article", Article);
