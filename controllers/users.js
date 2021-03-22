const { Router } = require('express');
const { verifyToken } = require('../midllewares/jwt');
const { createToken } = require('../midllewares/jwt');
const {
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyEmailExist,
} = require('../midllewares/validation');
const { User } = require('../models');

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    await verifyName(displayName);
    await verifyEmail(email);
    await verifyPassword(password);
    await verifyEmailExist(email);
    const user = await User.create({ displayName, email, password, image });
    console.log(user.dataValues);
    const token = createToken(user.dataValues);
    res.status(201).json(token);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

userRouter.get('/', verifyToken, async (_req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

userRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).json({ message: 'Usuário não existe' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

userRouter.delete('/me', verifyToken, async (req, res) => {
  try {
    const { id } = req.payload;
    console.log(id);
    await User.destroy({ where: { id } });
    res.status(204).json({ message: 'Usuário deletado' });
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = userRouter;
