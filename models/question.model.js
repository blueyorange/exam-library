const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  examDate: {
    type: String,
  },
  tags: [{ type: String }],
  questionImages: [{ type: Buffer }],
  markSchemeImages: [{ type: Buffer }],
  questionText: { type: String },
  markSchemeText: { type: String },
});

module.exports = mongoose.model("Question", QuestionSchema);
