const router = require("express").Router();
const verify = require("../middlewares/verifiy");
const Subject = require("../models/subject");

router.post("/", verify, async (req, res) => {
  try {
    const { title, category } = req.body;
    const newSubject = await new Subject({
      title,
      category,
      user: req.user.id,
    });
    await newSubject.save().then(() => res.status(200).json(newSubject.id));
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allSubject = await Subject.find({});

    res.status(200).json(allSubject);
  } catch (err) {
    res.status(500).json("error server");
  }
});

router.get("/user", verify, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id });

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete", verify, async (req, res) => {
  try {
    const allSubject = await Subject.deleteMany({});
    res.status(200).json("documents deleted succesfully");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
