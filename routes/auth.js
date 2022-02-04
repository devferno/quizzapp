const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    console.log("done");
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("user added succesfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    if (!user) return res.status(400).json("error not founded");
    const hashedPassword = await bcrypt.compare(password, user[0].password);
    if (!hashedPassword) return res.status(404).json("email or pass incorrect");
    const token = jwt.sign({ id: user[0]._id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
