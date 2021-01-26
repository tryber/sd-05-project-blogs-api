const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  userValidation,
  loginValidation,
} = require('../services/UsersServices');

const router = express.Router();
const secret = 'lyraah';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/user', userValidation, rescue(async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((_newUser) => {
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      res.status(201).json(token);
    })
    .catch(() => res.status(409).json({ message: 'Usuário já existe' }));
}));

router.post('/login', loginValidation, rescue(async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    res.status(200).json(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
}));

module.exports = router;
