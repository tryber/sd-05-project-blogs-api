const { Router } = require('express');
const middlewares = require('../middlewares');
// const { usersService } = require('../services');
const models = require('../models');

const loginRouter = Router();

loginRouter.post('/', middlewares.validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });
  if (password !== user.dataValues.password) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  const token = middlewares.jwt.createToken(user);
  return res.status(200).json({ token });
});

module.exports = loginRouter;
