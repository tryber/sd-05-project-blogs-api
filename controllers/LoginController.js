const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();
// const service = require('../services/userService');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'calado';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const router = express.Router();

router.post('/', async (req, res, _next) => {
  const { email, password } = req.body;
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (!password) return res.status(400).json({ message: '"password" is required' });

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) return res.status(400).json({ message: 'Campos inválidos' });
  const { _id: id } = user;
  const { password: _, ...userWithoutPassword } = user;
  const payloadData = {
    iss: 'post-api',
    aud: 'identity',
    sub: id,
    userData: userWithoutPassword,
  };
  const token = jwt.sign(payloadData, secret, jwtConfig);
  return res.status(200).json({ token });
});

module.exports = router;
