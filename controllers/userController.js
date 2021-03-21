const express = require('express');
const { User } = require('../models');
// const authenticate = require('../middlewares/authentication');
const auth = require('../services/token');
const userMiddleware = require('../middlewares/userMiddleware');

const routeUser = express.Router();

routeUser.post('/', async (req, res) => {
  // const { displayName, email, password, image } = req.body;
  const response = await userMiddleware(req);
  if (response.err) {
    return res.status(response.err.status).json(response.err);
  }

  res.status(201).json(response);
});

routeUser.get('/', async (req, res) => {
  try {
    const response = await auth(req);
    if (response.err) {
      return res.status(response.err.status).json(response.err);
    }
    const data = await User.findAll();
    res.status(200).json(data);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = routeUser;
