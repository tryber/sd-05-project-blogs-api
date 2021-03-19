// requisição do frontend
const express = require('express');
const { modelUser } = require('../models/userModel');
const routeUser = express.Router();

routeUser.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;
  modelUser
    .create({ displayName, email, password, image })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = routeUser;
