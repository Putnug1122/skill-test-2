const router = require("express").Router();
const registerUser = require("./register.UserController");
const loginUser = require("./login.UserController");
const getUser = require("./get.UserController");
const validator = require("../helpers/validator");
const auth = require("../middlewares/jwt");
router.post(
  "/register",
  registerUser.validation,
  validator,
  registerUser.service
);
router.post("/login", loginUser.validation, validator, loginUser.service);
router.get("/get", auth.checkJWT, getUser.service);
module.exports = router;
