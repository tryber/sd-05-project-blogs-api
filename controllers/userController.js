const { Router } = require('express');

const { User } = require('../models');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const usersRouter = Router();
const checkEmail = require('../middlewares/emailMiddleware');
const checkPwd = require('../middlewares/pwdMiddleware');
const checkDisplayName = require('../middlewares/displayNameMiddleware');

usersRouter.post('/', checkEmail, checkPwd, checkDisplayName, async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;

  const createUser = await User.create({ displayName, email, password, image });

  return res.status(201).json(createUser);
});

usersRouter.get('/', tokenMiddleware, async (_req, res) => {
  const listUsers = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(listUsers);
});

usersRouter.get('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const userById = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!userById) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(userById);
});

module.exports = usersRouter;
