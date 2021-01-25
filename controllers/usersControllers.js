const { User } = require('../models');
const createToken = require('../auth/createToken');
const { sendError } = require('../services');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await User.create({ displayName, email, password, image });
    const { password: _, ...userData } = result;
    const token = createToken(userData);

    return res.status(201).json({ token });
  } catch {
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = {
  create,
};
