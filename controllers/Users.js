const express = require('express');
const { User } = require('../models');
const authToken = require('../middlewares/authToken');
const userById = require('../middlewares/userById');
const services = require('../services');

const router = express.Router();

router.post('/', async (req, res) => {
  const response = await services.userPostMiddleware(req);

  if (response.err) return res.status(response.err.status).json(response.err);

  res.status(201).json(response);
});

router.get('/:id', authToken, userById, async (req, res) => {
  try {
    const { userData } = req;

    res.status(200).json(userData);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.get('/', authToken, async (req, res) => {
  try {
    const data = await User.findAll();

    res.status(200).json(data);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.delete('/me', authToken, async (req, res) => {
  try {
    if (!req.user) return res.status(204).send({ message: 'Algo deu errado' });
    const { email } = req.user;
    await User.destroy({ where: { email } });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
