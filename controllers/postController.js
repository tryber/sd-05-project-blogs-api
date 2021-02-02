const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const verifyToken = require('../middleware/verifyToken');
const validatePost = require('../middleware/validateSchema');
const { User, Post } = require('../models');

const postRouter = Router();

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
})

postRouter.post('/', verifyToken, validatePost(schema) rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.payload.userWithoutPassword;

  await Post.create({ title, content, userId });

  return res.status(201).json({ title, content, userId });
}));

postRouter.get('/', verifyToken, rescue(async (req, res) => {
  const posts = await Post.findAll({
    where: { userId: req.payload.userWithoutPassword.id },
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    attributes: { exclude: ['userId'] },
  });

  if (!posts) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(posts);
}));

postRouter.get('/:id', verifyToken, rescue(async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    attributes: { exclude: ['userId'] },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
}));

postRouter.put('/:id', verifyToken, rescue(async (req, res) => {
  const { id: userId } = req.payload.userWithoutPassword;
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  const post = await Post.findByPk(req.params.id);

  console.log(post, 'post');

  if (!post) return res.status(400).json({ message: 'Post não encontrado' });

  if (post.dataValues.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await Post.update({ title, content }, { where: { id: req.params.id } });

  return res.status(200).json({ title, content, userId });
}));

postRouter.delete('/:id', verifyToken, async (req, res) => {
  const { id: userId } = req.payload.userWithoutPassword;

  const post = await Post.findByPk(req.params.id);

  console.log(post);

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  if (post.dataValues.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await Post.destroy({ where: { id: req.params.id } });

  return res.status(204).json();
});

module.exports = postRouter;
