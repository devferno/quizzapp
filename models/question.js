const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  choices: [{ type: String, required: true }],
  response: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  },
});

module.exports = mongoose.model("Question", questionSchema);
