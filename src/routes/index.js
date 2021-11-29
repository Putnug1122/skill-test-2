var express = require("express");
var router = express.Router();
const userRouter = require("../controllers/routes");

router.use("/user", userRouter);
module.exports = router;
