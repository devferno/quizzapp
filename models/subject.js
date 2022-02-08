const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: [{ type: String, required: true }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
