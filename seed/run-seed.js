// DATA
let { questions } = require("./data");
const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/question.model");

async function run() {
  questions = await Promise.all(questions);
  console.log(process.env.MONGO_URI);
  console.log("All questiond read.");
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to the Database.");
      for (var q = 0; q < questions.length; q++) {
        await Question.create(questions[q]);
        console.count(`Questions added`);
      }
      console.log("Seeding finished!");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
}

run();
