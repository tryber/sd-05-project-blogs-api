const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const { generateToken } = require('../auth/token');
const validateLogin = require('../middleware/validateSchema');
const { User } = require('../models');

const loginRouter = Router();

const schema = Joi.object({
  email: Joi.string().email().required().not()
    .empty(),
  password: Joi.string().required().not()
    .empty(),
});

loginRouter.post('/', validateLogin(schema), rescue(async (req, res) => {
  const { email, password } = req.body;

  // TODO: verificar se o email e senha são iguais ao email e senha de algum usuário no banco.
  const user = await User.findOne({ where: { email, password } });

  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = await generateToken(user);

  return res.status(200).json({ token });
}));

module.exports = loginRouter;
