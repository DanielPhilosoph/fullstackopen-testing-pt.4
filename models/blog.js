const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
});

module.exports = mongoose.model("Blog", blogSchema);
