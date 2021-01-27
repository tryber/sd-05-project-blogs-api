const Router = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { userM } = require('../middlewares');

const secret = 'thebeatlesÉsuperestimado';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const users = Router();

users.post('/', userM.verifyReqExists, userM.verifyReqInfos, (req, res) => {
  const { body } = req;
  Users.create(body)
    .then(
      (user) => {
        console.log(user);
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
