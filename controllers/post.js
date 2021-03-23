const { Router } = require('express');
const middlewares = require('../middlewares');
// const { usersService } = require('../services');
const models = require('../models');

const postRouter = Router();

postRouter.post('/', middlewares.validatePost, middlewares.auth, async (req, res) => {
  const { id } = req.payload;
  const { content, title } = req.body;
  await models.Post.create({ content, title, userId: id });
  return res.status(201).json({ content, title, userId: id });
});

postRouter.get('/', middlewares.auth, async (req, res) => {
  const users = await models.User.findAll({});
  return res.status(200).json(users);
});

postRouter.get('/:id', middlewares.auth, async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
});

postRouter.delete('/me', middlewares.auth, async (req, res) => {
  const { id } = req.payload;
  await models.User.destroy({ where: { id } });
  return res.status(204).json({});
});

module.exports = postRouter;
