const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, ref: 'User', required: true },
  // creationDate: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikedBy: { type: Array },
  comments: [{
    comment: { type: String },
    commentator: { type: String }
  }]
});

module.exports = mongoose.model('Post', postSchema);
