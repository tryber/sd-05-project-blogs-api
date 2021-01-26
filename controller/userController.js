const express = require('express');
const authenticate = require('../middleware/authenticate');
const createUser = require('../middleware/createUser');
const hasToken = require('../middleware/hasToken');
const userExists = require('../middleware/userExists');
const validateNewUserInformation = require('../middleware/validateNewUserInformation');
const { userService } = require('../service');

const route = express.Router();

route.post(
  '/',
  validateNewUserInformation,
  userExists,
  createUser,
  authenticate,
  (req, res) => {
    const { token } = req;
    return res.status(201).json({ token });
  },
);

route.get('/', hasToken, async (req, res) => {
  const usuarios = await userService.findAllUsers();

  return res.status(200).json(usuarios);
});

route.get('/:id', hasToken, async (req, res) => {
  const { id } = req.params;
  const usuario = await userService.findUserById(id);

  if (!usuario) {
    return res.status(404).json({
      message: 'Usuário não existe',
    });
  }

  return res.status(200).json(usuario);
});

route.delete('/me', hasToken, async (req, res) => {
  const { user } = req;
  console.log(user.id);
  await userService.deleteUser(parseInt(user.id, 10));

  return res.status(204).json();
});

module.exports = route;
