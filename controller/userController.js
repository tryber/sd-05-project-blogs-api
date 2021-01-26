const { Router } = require('express');
const rescue = require('express-rescue');

const usersFactory = require('../service/users/usersFactory');

const user = Router();

user.post(
  '/',
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const token = await usersFactory().createUser(displayName, email, password, image);

    if (token.error) {
      return res.status(token.statusCode).json({ message: token.message });
    }

    return res.status(201).json({ token });
  }),
);

module.exports = user;
