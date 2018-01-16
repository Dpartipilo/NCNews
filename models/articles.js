const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    requied: true
  },
  from_topic: {
    type: String,
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

module.exports = mongoose.model('Article', ArticleSchema);