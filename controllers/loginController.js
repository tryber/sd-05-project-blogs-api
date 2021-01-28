const Router = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { userM } = require('../middlewares');

const login = Router();

const secret = 'thebeatlesÉsuperestimado';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

login.post('/', userM.verifyLogin, (req, res) => {
  const { email } = req.body;

  Users.findOne({ where: { email } })
    .then(
      (user) => {
        console.log(user);
        const token = jwt.sign({ data: user }, secret, jwtConfig);
        res.status(200).json({ token });
      },
    )
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

module.exports = login;
