const { Router } = require('express');

const service = require('../service/usersService');

const users = Router();
// estou explicitando qual função estou pegando do webtokencreate
const { createToken } = require('../Middlewares/webTokenCreate');

users.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    // console.log(req.body)
    const userCreate = await service.create(displayName, email, password, image);
    // console.log(userCreate);
    if (userCreate.error) {
      return res.status(userCreate.statusCode).json({ message: userCreate.message });
    }
    const token = createToken({
      displayName,
      iss: 'post_api',
    });
    // console.log(token);
    res.status(201).json({ token });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = users;
