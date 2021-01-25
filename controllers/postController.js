const { Posts, Users } = require('../models');
const { sendError } = require('../services');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const response = await Posts.create({ title, content, userId: id });

  res.status(201).json(response);
};

const index = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const result = await Posts.findAll({ include: { model: Users, as: 'user' } });

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
    const { authorization } = req.headers;

    if (authorization) {
      const result = await Posts.findOne({ where: { id }, include: { model: Users, as: 'user' } });

      if (!result) {
        return res.status(404).json(sendError('Post não existe'));
      }
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = { create, index, show };
