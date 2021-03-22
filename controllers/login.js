const express = require('express');

const rescue = require('express-rescue');

const loginRouter = express.Router();

const { User } = require('../models');

// const { verifyToken } = require('../middlewares/verifyToken');

const { createToken } = require('../services/createToken');

// 2 - Sua aplicação deve ter o endpoint POST /login

loginRouter.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await User.findOne({ where: { email, password } });

    if (!userLogin) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = await createToken(userLogin);

    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
