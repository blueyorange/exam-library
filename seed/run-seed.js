// DATA
const { questions } = require("./data");
const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/question.model");

// DATABASE
//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
const db = mongoose.connection;

const allPromises = Promise.all(questions).then((questions) => {
  questions.forEach((data) => {
    const q = new Question(data);
    q.save();
  });
});
