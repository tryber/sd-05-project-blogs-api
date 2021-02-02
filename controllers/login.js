const express = require('express');
const rescue = require('express-rescue');
const { generateToken } = require('../auth/token');
const verifyToken = require('../middlewares/verifyToken');
const { User } = require('../models');

const loginRouter = express.Router();

// 2 - Sua aplicação deve ter o endpoint POST /login
loginRouter.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = generateToken(user);

    return res.status(201).json({ token });
  }),
);

module.exports = loginRouter;
