const { Router } = require('express');
const createUser = require('../middleware/createUser');
const hasEmail = require('../middleware/hasEmail');
const isNewUser = require('../middleware/isNewUser');
const isAuthenticate = require('../middleware/isAuthenticate');
const { createToken } = require('../middleware/createToken');
const hasToken = require('../middleware/hasToken');
const userService = require('../services/userService');

const route = Router();

route.post(
  '/',
  isNewUser,
  hasEmail,
  createUser,
  isAuthenticate,
  async (req, res) => {
    try {
      const { displayName } = req.body;
      const token = await createToken({ displayName, iss: 'blog_api' });
      return res.status(201).json({ token });
    } catch (err) {
      console.error('Deu ruim', err);
    }
  },
);

route.get('/', hasToken, async (_req, res) => {
  try {
    const getAllUsers = await userService.getUsers();
    return res.status(200).json(getAllUsers);
  } catch (error) {
    console.error('Deu Ruim', error);
  }
});

module.exports = route;
