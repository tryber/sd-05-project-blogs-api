const { Router } = require('express');
const middlewares = require('../middlewares');
const models = require('../models');

const postRouter = Router();

postRouter.post('/', middlewares.validatePost, middlewares.auth, async (req, res) => {
  const { id } = req.payload;
  const { content, title } = req.body;
  await models.Post.create({ content, title, userId: id });
  return res.status(201).json({ content, title, userId: id });
});

postRouter.get('/', middlewares.auth, async (req, res) => {
  const { id } = req.payload;
  const posts = await models.Post.findAll({
    where: { userId: id },
    attributes: { exclude: 'userId' },
    include: { model: models.User, as: 'user', attributes: { excludes: 'password' } },
  });
  return res.status(200).json(posts);
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
