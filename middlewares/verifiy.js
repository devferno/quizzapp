const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = jwt.verify(authorization, process.env.SECRET_KEY);
    console.log(token);
    req.user = token;
    next();
  } catch (err) {
    res.status(505).json(err);
  }
};

module.exports = verify;
