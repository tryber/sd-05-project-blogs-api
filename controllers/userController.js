const { Router } = require('express');
const rescue = require('express-rescue');
const createUser = require('../middleware/createUser');
const hasEmail = require('../middleware/hasEmail');
const isNewUser = require('../middleware/isNewUser');
const isAuthenticate = require('../middleware/isAuthenticate');
const hasToken = require('../middleware/hasToken');
const userService = require('../services/userService');

const route = Router();

route.post('/', isNewUser, hasEmail, createUser, isAuthenticate, (req, res) => {
  const { token } = req;
  return res.status(201).json({ token });
});

route.get(
  '/',
  hasToken,
  rescue(async (_req, res) => {
    try {
      const getAllUsers = await userService.getUsers();
      return res.status(200).json(getAllUsers);
    } catch (err) {
      return res.status(400).json({ message: 'no user founded', err });
    }
  }),
);

module.exports = route;
