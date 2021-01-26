const { Router } = require('express');
const rescue = require('express-rescue');

const usersFactory = require('../service/users/usersFactory');

const login = Router();

login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const token = await usersFactory().logUser(email, password);

    if (token.error) {
      return res.status(token.statusCode).json({ message: token.message });
    }

    return res.status(200).json({ token });
  }),
);

module.exports = login;
