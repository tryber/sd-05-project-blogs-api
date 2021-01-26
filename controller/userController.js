const { Router } = require('express');
const rescue = require('express-rescue');

const usersFactory = require('../service/users/usersFactory');
const authToken = require('../middlewares/authToken');

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

user.get(
  '/',
  authToken,
  rescue(async (req, res) => {
    const allUsers = await usersFactory().listAllUsers();
    return res.status(200).json(allUsers);
  }),
);

user.get(
  '/:id',
  authToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const user = await usersFactory().getUserById(id);

    if (user.error) {
      return res.status(user.statusCode).json({message: user.message});
    }
    return res.status(200).json(user);
  }),
);

module.exports = user;
