const express = require('express');

const rescue = require('express-rescue');

const userRouter = express.Router();

const { User } = require('../models');

const { verifyToken } = require('../middlewares/verifyToken');

const { createToken } = require('../services/createToken');

// 1 - Sua aplicação deve ter o endpoint POST /user

userRouter.post(
  '/',
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    // Verificação de duplicidade de usuário
    const verifyUser = await User.findOne({ where: { email } });
    if (verifyUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    const addUser = await User.create({ displayName, email, password, image });
    const token = await createToken(addUser);
    console.log(token);
    return res.status(201).json({ token });
  }),
);

// 3 - Sua aplicação deve ter o endpoint GET /user

userRouter.get(
  '/',
  verifyToken,
  rescue(async (req, res) => {
    const listUsers = await User.findAll();
    res.status(200).json(listUsers);
  }),
);

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
userRouter.get(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const idUser = await User.findOne({ where: { id } });

    if (!idUser) return res.status(404).json({ message: 'Usuário não existe' });

    return res.status(200).json(idUser);
  }),
);

// 5 - Sua aplicação deve ter o endpoint DELETE /user/me
userRouter.get(
  '/me',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.payload.userData;
    await User.destroy({ where: { id } });
    return res.status(204).send();
  }),
);

module.exports = userRouter;
