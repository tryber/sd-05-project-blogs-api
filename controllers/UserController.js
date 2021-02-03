const { Router } = require('express');

const services = require('../services/usersService');

const { createWebToken } = require('../auth/createToken');

const validateToken = require('../auth/validateToken');

const users = Router();

users.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await services.create(displayName, email, password, image);
    if (newUser.error) {
      return res.status(newUser.code).json({ message: newUser.message });
    }
    const payload = {
      id: newUser.dataValues.id,
      email: newUser.dataValues.email,
      displayName: newUser.dataValues.displayName,
    };
    const token = await createWebToken(payload);
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

users.get('/', validateToken, async (_req, res) => {
  const getUsers = await services.getAll();
  return res.status(200).json(getUsers);
});

users.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const userById = await services.getById(id);
  if (userById.error) return res.status(userById.code).json({ message: userById.message });
  return res.status(200).json(userById);
});

users.delete('/me', validateToken, async (req, res) => {
  try {
    const { id } = req.payload;
    const delUser = await services.deleteUser(id);
    return res.status(204).json(delUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = users;
