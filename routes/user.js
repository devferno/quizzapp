const router = require("express").Router();
const User = require("../models/user.js");
const verify = require("../middlewares/verifiy");
const multerImage = require("../middlewares/multerImage");
const { uploads } = multerImage;

//user upload profile and cover image
router.post(
  "/upload-image",
  uploads.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      res.status(200).json("success!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

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
