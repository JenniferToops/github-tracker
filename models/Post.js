const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  // github username matches what's entered
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  // repo link
  repoLink: {
    type: String,
    required: true,
  },
  // text description
  description: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    required: false,
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Post", PostSchema);
