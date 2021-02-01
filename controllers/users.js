const express = require('express');
/* const rescue = require('express-rescue');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyNewUser, verifyNewAdmin } = require('../services/users'); */
const { User } = require('../models');

const usersController = express.Router();

// 1 - Crie um endpoint para o cadastro de usuários
usersController.post('/', async (req, res) => {
  const { dispĺayName, email, password, image } = req.body;
  console.log(req.body);
  const newUser = await User.create({ dispĺayName, email, password, image });

  return res.status(201).json({ user: newUser });
});

module.exports = usersController;
