const jwt = require("jsonwebtoken");

const createJWT = (user) => {
  delete user.dataValues.password;
  const token = jwt.sign({ user: user.dataValues }, "skill-test", {
    expiresIn: "1h",
  });
  return token;
};

const checkJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "skill-test", (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Invalid token",
        });
      } else {
        req.auth = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { createJWT, checkJWT };
