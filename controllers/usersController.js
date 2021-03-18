const express = require('express');
const encrypt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models');
const jwt = require('../middlewares/generateToken');

const userRouter = express.Router();

// regex Tryber
const ckeckEmail = /\S+@\S+\.\S+/;

// Requisito 1 - endpoint POST /user
userRouter.post('/user', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  if (displayName.length < 8) {
    // DisplayName
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) return res.status(400).json({ message: '"email" is required' }); // email
  if (!ckeckEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const userExists = await User.findOne({ where: { email } }); // userExists
  if (userExists) return res.status(409).json({ message: 'Usuário já existe' });
  //  check password
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  const user = { displayName, email, password, image };
  const token = jwt.createToken(user);
  await User.create(user);
  res.status(201).json({ token });
});

// Requisito 2 - endpoint POST /login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //  check email
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  //  check password
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) return res.status(400).json({ message: '"password" is required' });
  //  check user
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });
  const token = jwt.createToken(user);
  res.status(200).json({ token });
});

// Requisito 3 - endpoint GET /user
userRouter.get('/user', jwt.authorizationToken, async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// Requisito 4 - endpoint GET /user/:id
userRouter.get('/user/:id', jwt.authorizationToken, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  const { id, displayName, email, image } = user;
  res.status(200).json({ id, displayName, email, image });
});

// Requisito 5 - endpoint DELETE /user/me
userRouter.delete('/user/me', jwt.authorizationToken, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, process.env.SECRET);
  await User.destroy({ where: { email: decoded.data.email } });
  res.status(204).end();
});

module.exports = userRouter;
