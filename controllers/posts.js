const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const verifyToken = require('../middlewares/verifyToken');
const verifyWithJoi = require('../middlewares/verifyWithJoi');

const { User, Post } = require('../models');

const postsRouter = express.Router();

const schema = Joi.object({
  title: Joi.string().required().not().empty(),
  content: Joi.string().required().not().empty(),
});

postsRouter.post(
  '/',
  verifyToken,
  verifyWithJoi(schema),
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.payload.userData;

    await Post.create({
      title,
      content,
      userId,
      published: Date.now(),
      updated: Date.now(),
    });

    return res.status(201).json({ title, content, userId });
  }),
);

postsRouter.get(
  '/',
  verifyToken,
  rescue(async (req, res) => {
    const allPosts = await Post.findAll({
      where: { userId: req.payload.userData.id },
      include: { model: User, as: 'user' },
    });

    if (!allPosts) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(allPosts);
  }),
);

postsRouter.get(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const specificPost = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'user',
      },
    });

    if (!specificPost) {
      return res.status(404).json({ message: 'Post não existe' });
    }

    return res.status(200).json(specificPost);
  }),
);

postsRouter.put(
  '/:id',
  verifyToken,
  verifyWithJoi(schema),
  rescue(async (req, res) => {
    const { id: userId } = req.payload.userData;
    const { title, content } = req.body;

    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    if (post.dataValues.userId !== userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await Post.update({ title, content }, { where: { id: req.params.id } });

    return res.status(200).json({ title, content, userId });
  }),
);

postsRouter.delete(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id: userId } = req.payload.userData;

    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    if (post.dataValues.userId !== userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await Post.destroy({ where: { id: req.params.id } });

    return res.status(204).json();
  }),
);

module.exports = postsRouter;
