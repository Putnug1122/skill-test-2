const { users } = require("../models");
const { body } = require("express-validator");
const service = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await users.create(payload);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.toString(),
    });
  }
};

const validation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .custom(async (value) => {
      // must have 50 char or less
      if (value.length > 50) {
        return Promise.reject("Name must be less than 50 characters");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      // must be unique
      const user = await users.findOne({ where: { email: value } });
      if (user) {
        return Promise.reject("Email is already registered");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value) => {
      // must have min 8 char
      if (value.length < 8) {
        return Promise.reject("Password must be at least 8 characters");
      }
    }),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .custom(async (value) => {
      // min 10 char max 13 char
      if (value.length < 10 || value.length > 13) {
        return Promise.reject("Phone must be 10-13 characters");
      }
    }),
  body("gender").notEmpty().withMessage("gender is required"),
];

module.exports = { service, validation };
