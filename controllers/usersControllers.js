const { User } = require('../models');
const createToken = require('../auth/createToken');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await User.create({ displayName, email, password, image });
    const { password: _, ...userData } = result;
    const token = createToken(userData);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  create,
};
