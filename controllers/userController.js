const { Router } = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const { generateToken } = require('../auth/token');
const verifyToken = require('../middleware/verifyToken');
const validateUser = require('../middleware/validateSchema');
const { User } = require('../models');

const userRouter = Router();

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

userRouter.post('/', validateUser(schema), rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const checkExistantUser = await User.findOne({ where: { email } });

  if (checkExistantUser) return res.status(409).json({ message: 'Usuário já existe' });

  const newUser = await User.create({ displayName, email, password, image });

  const token = await generateToken(newUser);

  return res.status(201).json({ token });
}));

userRouter.get('/', verifyToken, rescue(async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
}));

userRouter.get('/:id', verifyToken, rescue(async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
}));

userRouter.delete('/me', verifyToken, async (req, res) => {
  const { id } = req.payload.userWithoutPassword;

  await User.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = userRouter;
