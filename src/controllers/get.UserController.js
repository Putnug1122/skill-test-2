const { users } = require("../models");
const service = async (req, res) => {
  try {
    const where = {};
    if (req.auth.id) {
      where.id = req.auth.id;
    }
    const user = await users.findAll({
      where,
      attributes: {
        exclude: [
          "password",
          "id",
          "email",
          "address",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { service };
