let questions = require("./questions.js");
const fs = require("fs/promises");

console.log(process.cwd());

// map data to output format
questions = questions.map(async (question) => {
  let {
    number,
    date,
    topic,
    subject,
    award,
    examBoard,
    tags,
    questionImages,
    questionText,
    markSchemeImages,
    answerText,
  } = question;
  return {
    number,
    examDate: new Date(date).toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    }),
    tags: [subject, topic, award, examBoard, ...tags],
    questionImages: await Promise.all(
      questionImages.map(
        async (path) => await fs.readFile("./seed/data/" + path)
      )
    ),
    questionText,
    markSchemeImages: markSchemeImages.map(
      async (path) => await Promise.all(fs.readFile("./seed/data/" + path))
    ),
    markSchemeText: answerText,
  };
});

module.exports = { questions };
