const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/userServices');
const { createToken, validateToken } = require('../authentication');
const { validateUser, validateExistence } = require('../middlewares');

const userRouter = Router();

userRouter.post(
  '/',
  validateUser,
  validateExistence,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await services.createUser(displayName, email, password, image);

    if (newUser.error) return res.status(newUser.code).json({ message: newUser.message });

    const { password: _, ...userData } = newUser.dataValues;
    const token = await createToken(userData);

    return res.status(201).json({ token });
  }),
);

userRouter.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const users = await services.getAllUsers();

    return res.status(200).json(users);
  }),
);

userRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const user = await services.getUserById(id);

    if (user.error) {
      return res.status(user.code).json({ message: user.message });
    }

    return res.status(200).json(user);
  }),
);

userRouter.delete(
  '/me',
  validateToken,
  rescue(async (req, res) => {
    const { email } = req.payload;

    await services.deleteUser(email);

    return res.status(204).json({ message: 'Usuário apagado' });
  }),
);

module.exports = userRouter;
