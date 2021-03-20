// requisição do frontend
const express = require('express');
const { User } = require('../models');
const authenticate = require('../middlewares/authentication');

const routeUser = express.Router();

routeUser.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((newUser) => {
      const token = authenticate.getToken({ newUser });
      res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = routeUser;
