const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  body: {
    type: String,
    required: true
  },
  from_topic: {
    type: Schema.Types.ObjectId,
    required: true
  },
  created_at: {
    type: Number,
    default: new Date().getTime()
  },
  votes: {
    type: Number,
    default: 0
  },
  created_by: {
    type: String,
    required: true,
    default: "northcoder"
  }
});

module.exports = mongoose.model("Comment", Comment);
