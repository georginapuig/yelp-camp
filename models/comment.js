const mongoose = require("mongoose");

// schema setup
const CommentSchema = new mongoose.Schema({
  text: String,
  author: String
});
  
// model
module.exports = mongoose.model("Comment", CommentSchema);
  