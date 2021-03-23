const { Router } = require('express');
const middlewares = require('../middlewares');
// const { usersService } = require('../services');
const models = require('../models');

const userRouter = Router();

userRouter.post('/', middlewares.validateFields, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  if (await models.User.findOne({ where: { email } })) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  const newUser = await models.User.create({ displayName, email, password, image });
  const token = middlewares.jwt.createToken(newUser);
  return res.status(201).json({ token });
});

userRouter.get('/', middlewares.auth, async (req, res) => {
  const users = await models.User.findAll({});
  return res.status(200).json(users);
});

userRouter.get('/:id', middlewares.auth, async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
});

userRouter.delete('/me', middlewares.auth, async (req, res) => {
  const { id } = req.payload;
  await models.User.destroy({ where: { id } });
  return res.status(204).json({});
});

module.exports = userRouter;
