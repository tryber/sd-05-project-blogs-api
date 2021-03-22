const express = require('express');

const rescue = require('express-rescue');

const userRouter = express.Router();

const { User } = require('../models');

const { createToken } = require('../services/createToken');

// 1 - Sua aplicação deve ter o endpoint POST /user

userRouter.post(
  '/',
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    // Verificação de duplicidade de usuário
    const verifyUser = await User.findOne({ where: { email } });
    if (verifyUser) {
      return res.status(409).json({ message: 'Usuário existente' });
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
  rescue(async (req, res) => {
    const listUsers = await User.findAll();
    res.status(200).json(listUsers);
  }),
);

module.exports = userRouter;
