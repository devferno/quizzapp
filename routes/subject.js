const router = require("express").Router();
const verify = require("../middlewares/verifiy");
const Subject = require("../models/subject");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const uploads = multer({ storage: storage });

router.post("/", verify, uploads.single("image"), async (req, res) => {
  try {
    const { title, category } = req.body;

    const newSubject = {
      title,
      category: category.split(","),
      user: req.user.id,
      image: {
        data: fs.readFileSync(
          path.join(
            "C:/Users/HP/Desktop/30Code/quizzapp/server/" +
              "/uploads/" +
              req.file.filename
          )
        ),
        contentType: "image/png",
      },
    };

    Subject.create(newSubject, (err, item) => {
      if (err) {
        res.status(455).json(err);
      } else {
        item.save();
        res.status(200).json(item._id);
      }
    });
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

// user delete a quizz
router.delete("/:id", verify, async (req, res) => {
  try {
    const subjectDeleted = await Subject.findOneAndRemove({
      user: req.user.id,
      _id: req.params.id,
    });

    res.status(200).json("documents deleted succesfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
