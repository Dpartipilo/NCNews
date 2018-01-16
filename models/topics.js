const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    lowercase: true,
    required: true
  }
});

module.exports = mongoose.model('Topic', TopicsSchema);