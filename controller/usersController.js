const { Router } = require('express');

const service = require('../service/usersService');

const { Users } = require('../models');

const checkToken = require('../Middlewares/checkToken');

const users = Router();
// estou explicitando qual função estou pegando do webtokencreate
const { createToken } = require('../Middlewares/webTokenCreate');

users.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userCreate = await service.create(displayName, email, password, image);
    if (userCreate.error) {
      return res.status(userCreate.statusCode).json({ message: userCreate.message });
    }
    const token = createToken({
      displayName,
      iss: 'post_api',
    });
    res.status(201).json({ token });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Deu ruim' });
  }
});

users.get('/', checkToken, async (_req, res) => {
  try {
    const findUsers = await Users.findAll();
    // console.log('findUsers==>', findUsers);
    res.status(200).json(findUsers);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = users;
