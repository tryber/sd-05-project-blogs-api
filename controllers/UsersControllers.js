const express = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');
const { userValidation } = require('../services/UsersServices');

const router = express.Router();

router.post('/user', userValidation, rescue(async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => res.status(201).json(newUser))
    .catch(() => res.status(409).json({ message: 'Usuário já existe' }));
}));

module.exports = router;
