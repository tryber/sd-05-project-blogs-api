const { Users } = require('../models');
const { sendError } = require('../services');

const { createToken } = require('../auth/token');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await Users.create({ displayName, email, password, image });
    const { password: _, ...userData } = result;
    const token = createToken(userData);

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const index = async (req, res) => {
  try {
    const result = await Users.findAll();

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json(sendError('Usuário não existe'));
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const remove = async (req, res) => {
  try {
    const { email } = req.user;
    await Users.destroy({ where: { email } });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = {
  create,
  index,
  show,
  remove,
};
