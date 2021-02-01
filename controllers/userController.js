const { Router } = require('express');
const createUser = require('../middleware/createUser');
const hasEmail = require('../middleware/hasEmail');
const isNewUser = require('../middleware/isNewUser');
const isAuthenticate = require('../middleware/isAuthenticate');

const route = Router();

route.post(
  '/',
  isNewUser,
  hasEmail,
  createUser,
  isAuthenticate,
  (req, res) => {
    const { token } = req;
    return res.status(201).json({ token });
  },
);

module.exports = route;
