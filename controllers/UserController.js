const { Router } = require('express');

const services = require('../services/usersService');

const { createWebToken } = require('../auth/createToken');

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

module.exports = users;
