const express = require("express");
const router = express.Router();
const auth = require("../auth/auth.js");
const Question = require("../models/question.model");

router.get("/", auth, async (req, res) => {
  const questions = await Question.find(
    {},
    "-questionImages -markSchemeImages"
  );
  console.log(questions);
  if (req.user) {
    return res.render("index.njk", { currentUser: req.user, questions });
  } else {
    return res.redirect("/login");
  }
});

module.exports = router;
