const { users } = require("../models");
const service = async (req, res) => {
  try {
    const where = {};
    if (req.param.id) {
      where.id = req.param.id;
    }
    const user = await users.findAll({
      where,
      attributes: {
        include: ["name", "gender", "phone"],
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { service };
