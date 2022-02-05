const router = require("express").Router();
const User = require("../models/user.js");
const verify = require("../middlewares/verifiy");

router.get("/", verify, async (req, res) => {
  try {
    const users = await User.find({ _id: req.user.id });
    const { name, email } = users[0];
    res.status(200).json({ name, email });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
