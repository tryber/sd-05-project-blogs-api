const { Router } = require('express');
const rescue = require('express-rescue');
const { generateToken } = require('../auth/token');
const { User } = require('../models');

const loginRouter = Router();

loginRouter.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;

  // TODO: verificar se o email e senha são iguais ao email e senha de algum usuário no banco.
  const user = await User.findOne({ where: { email, password } });

  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = await generateToken(user);

  return res.status(201).json({ token });
}));

module.exports = loginRouter;
