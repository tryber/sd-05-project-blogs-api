const { Router } = require('express');
const createUser = require('../middleware/createUser');
const hasEmail = require('../middleware/hasEmail');
const isNewUser = require('../middleware/isNewUser');
const isAuthenticate = require('../middleware/isAuthenticate');
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
      const token = req.headers.authorization;
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

route.get('/:id', hasToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error('Deu ruim', err);
  }
});

module.exports = route;
