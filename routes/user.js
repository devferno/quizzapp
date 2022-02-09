const router = require("express").Router();
const User = require("../models/user.js");
const verify = require("../middlewares/verifiy");
const multerImage = require("../middlewares/multerImage");
const { uploads } = multerImage;
const path = require("path");
const fs = require("fs");

//user upload profile and cover image
router.post(
  "/upload-cover",
  verify,
  uploads.single("cover"),
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        coverImage: {
          data: fs.readFileSync(
            path.join(
              "C:/Users/HP/Desktop/30Code/quizzapp/server/uploads/" +
                req.file.filename
            )
          ),
          contentType: "/image/png",
        },
      });
      console.log(req.file);
      res.status(200).json("success!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post("/upload-profile", uploads.single("profile"), (req, res) => {
  try {
    console.log(req.file);
    res.status(200).json("sucess!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get the connected user
router.get("/", verify, async (req, res) => {
  try {
    const users = await User.find({ _id: req.user.id });
    const { name, email, profileImage, coverImage } = users[0];
    res.status(200).json({ name, email, profileImage, coverImage });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
