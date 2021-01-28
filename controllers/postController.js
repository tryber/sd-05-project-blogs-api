const { Op } = require('sequelize');
const { Posts, Users } = require('../models');
const { sendError } = require('../services');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const response = await Posts.create({ title, content, userId: id });

  res.status(201).json(response);
};

const index = async (_, res) => {
  try {
    const result = await Posts.findAll({ include: { model: Users, as: 'user' } });

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Posts.findOne({
      where: { id },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });

    if (!result) {
      return res.status(404).json(sendError('Post não existe'));
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;
    const post = await Posts.update({ title, content }, { where: { id, userId } });
    if (post[0] === 0) {
      return res.status(401).json(sendError('Usuário não autorizado'));
    }
    const updatedPost = await Posts.findOne({
      where: { id },
    });
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const search = async (req, res) => {
  try {
    const { q } = req.query;

    const posts = await Posts.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Posts.findOne({ where: { id } });
    const userid = post?.dataValues.userId;

    if (!post) {
      return res.status(404).json(sendError('Post não existe'));
    }

    if (userid === userId) {
      await Posts.destroy({ where: { id, userId } });

      return res.status(204).send();
    }

    return res.status(401).json(sendError('Usuário não autorizado'));
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = { create, index, show, edit, search, remove };
