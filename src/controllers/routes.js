const router = require("express").Router();
const registerUser = require("./register.UserController");
const validator = require("../helpers/validator");
router.post(
  "/register",
  registerUser.validation,
  validator,
  registerUser.service
);
module.exports = router;
