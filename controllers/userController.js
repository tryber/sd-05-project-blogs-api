const Router = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { userM, authToken } = require('../middlewares');

const secret = 'thebeatlesÉsuperestimado';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const users = Router();

users.get('/', authToken, (_req, res) => {
  Users.findAll()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

users.post('/', userM.verifyCreate, (req, res) => {
  const { body } = req;
  Users.create(body)
    .then(
      (user) => {
        const token = jwt.sign({ data: user }, secret, jwtConfig);
        res.status(201).json({ token });
      },
    )
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

module.exports = users;
