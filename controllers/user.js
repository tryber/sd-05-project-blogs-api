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

module.exports = userRouter;
