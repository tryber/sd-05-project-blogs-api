const express = require('express');
const { User } = require('../models');
// const authenticate = require('../middlewares/authentication');
const auth = require('../middlewares/token');
const userMiddleware = require('../middlewares/userMiddleware');
// const getUserById = require('../middlewares/getUser');

const routeUser = express.Router();

routeUser.post('/', async (req, res) => {
  // const { displayName, email, password, image } = req.body;
  const response = await userMiddleware(req);
  if (response.err) {
    return res.status(response.err.status).json(response.err);
  }

  res.status(201).json(response);
});

routeUser.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    // const { user } = req;
    const data = await User.findOne({ where: { id } });
    if (!data) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    // req.user = data;
    res.status(200).json(data);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

routeUser.get('/', auth, async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

routeUser.delete('/me', auth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(204).send({ message: 'Algo deu errado' });
    }
    const { email } = req.user;
    await User.destroy({ where: { email } });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = routeUser;
