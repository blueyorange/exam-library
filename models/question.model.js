const mongoose = require("mongoose");

function bufferToBase64(buffer) {
  return buffer.toString("base64");
}

const QuestionSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  examDate: {
    type: String,
  },
  tags: [{ type: String }],
  questionImages: [{ type: Buffer, get: bufferToBase64 }],
  markSchemeImages: [{ type: Buffer }],
  questionText: { type: String },
  markSchemeText: { type: String },
});

module.exports = mongoose.model("Question", QuestionSchema);
