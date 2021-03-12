const express = require('express');

const rescue = require('express-rescue');

const { Post, User } = require('../models');

const validateToken = require('../middleware/validaToken');

const {
  CREATE_POST_SCHEMA,
  validate,
} = require('../utils/validation');

const postRouter = express.Router();

postRouter.post('/', validateToken, rescue(async (req, res) => {
  const { title, content } = req.body;
  validate(CREATE_POST_SCHEMA)(req.body);
  try {
    const { id } = req.payload;
    await Post.create({ title, content, userId: id });
    return res.status(201).json({ title, content, userId: id });
  } catch (error) {
    throw new Error('Algo deu errado|500');
  }
}));

// GET /user/-> Comportamento de getALL
postRouter.get('/', validateToken, rescue(async (_req, res) => {
  const allPosts = await Post.findAll(({ include: { model: User, as: 'user' } }));
  res.status(200).json(allPosts);
}));

// GET /user/:id -> Comportamento de getById
postRouter.get('/:id', validateToken, rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await Post.findOne({ where: { id }, include: { model: User, as: 'user' } });
    if (!postById) throw new Error('Post não existe|404');
    res.status(200).json(postById);
  } catch {
    throw new Error('Post não existe|404');
  }
}));

postRouter.put('/:id', validateToken, rescue(async (req, res) => {
  validate(CREATE_POST_SCHEMA)(req.body);
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.payload;

  const postById = await Post.findByPk(id);
  if (!postById) throw new Error('Usuário não autorizado|401');
  if (postById.userId !== userId) throw new Error('Usuário não autorizado|401');
  await Post.update({ title, content }, { where: { id, userId } });
  return res.status(200).json({ title, content, userId: postById.userId });
}));

module.exports = postRouter;
