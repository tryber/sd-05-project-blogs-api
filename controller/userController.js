const express = require('express');
const authenticate = require('../middleware/authenticate');
const createUser = require('../middleware/createUser');
const userExists = require('../middleware/userExists');
const validateNewUserInformation = require('../middleware/validateNewUserInformation');

const route = express.Router();

route.post(
  '/',
  validateNewUserInformation,
  userExists,
  createUser,
  authenticate, (req, res) => {
    const { token } = req;
    return res.status(201).json({ token });
  },
);

module.exports = route;
