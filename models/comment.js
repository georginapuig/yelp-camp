const mongoose = require("mongoose");

// schema setup
const CommentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // reffers to the User model
    },
    username: String
  }
});
  
// model
module.exports = mongoose.model("Comment", CommentSchema);
  