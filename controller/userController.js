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
    const userFound = await usersFactory().getUserById(id);

    if (userFound.error) {
      return res.status(userFound.statusCode).json({ message: userFound.message });
    }
    return res.status(200).json(userFound);
  }),
);

user.delete(
  '/me',
  authToken,
  rescue(async (req, res) => {
    const token = req.headers.authorization;
    await usersFactory().deleteUser(token);
    return res.status(204).send();
  }),
);

module.exports = user;
