const { users } = require("../models");
const { compareSync } = require("bcrypt");
const { body } = require("express-validator");
const jwt = require("../middlewares/jwt");
const service = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    if (!compareSync(password, user.password)) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign({ id: user.id });
    return res.status(200).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};

const validation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { service, validation };
