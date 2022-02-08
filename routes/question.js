const router = require("express").Router();
const Question = require("../models/question");
const verify = require("../middlewares/verifiy");

router.post("/:id", async (req, res) => {
  try {
    console.log(req.params);
    req.body.forEach(async (item) => {
      const { question, choices, response } = item;

      const newquestion = await new Question({
        question,
        choices,
        response,
        subject: req.params.id,
      });

      await newquestion.save();
    });
    res.status(200).json("questions added succefully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const allQuestion = await Question.find({ subject: req.params.id });
    res.status(200).json(allQuestion);
  } catch (err) {
    res.status(500).json("error server");
  }
});

module.exports = router;
