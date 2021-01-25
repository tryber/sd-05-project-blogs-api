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
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const list = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const result = await User.findAll();

      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json(sendError('Usuário não existe'));
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = {
  create,
  list,
  show,
};
