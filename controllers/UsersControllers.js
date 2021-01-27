const express = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const {
  userValidation,
  loginValidation,
  authValidation,
} = require('../services/UsersServices');

const router = express.Router();
const secret = 'lyraah';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post(
  '/user',
  userValidation,
  rescue(async (req, res, _next) => {
    const { displayName, email, password, image } = req.body;
    User.create({ displayName, email, password, image })
      .then((_newUser) => {
        const token = jwt.sign({ data: email }, secret, jwtConfig);
        res.status(201).json({ token });
      })
      .catch(() => res.status(409).json({ message: 'Usuário já existe' }));
  }),
);

router.post(
  '/login',
  loginValidation,
  rescue(async (req, res) => {
    try {
      const { email } = req.body;
      const token = jwt.sign({ data: email }, secret, jwtConfig);
      res.status(200).json({ token });
    } catch (e) {
      res.status(500).send(e.message);
    }
  }),
);

router.get(
  '/user',
  authValidation,
  rescue(async (_req, res) => {
    User.findAll().then((users) => res.status(200).json(users));
  }),
);

router.get('/user/:id', authValidation, (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (user === null) {
        res.status(404).json({ message: 'Usuário não existe' });
      }
      return res.status(200).json(user);
    })
    .catch(() =>
      res
        .status(500)
        .json({ message: 'Alguns bugs tomaram conta dessa lógica :(' }));
});

router.delete('/user/me', authValidation, (req, res) => {
  const { authorization } = req.headers;
  const decode = jwt.verify(authorization, secret);
  const email = decode.data;
  User.destroy({
    where: {
      email,
    },
  })
    .then(() => res.status(204).send())
    .catch(() => res.status(500).json({ message: 'Alguns bugs tomaram conta dessa lógica :(' }));
});

module.exports = router;
