const express = require('express');
const { User } = require('../models');
const authToken = require('../services/authToken');
const userById = require('../services/userById');
const services = require('../services');

const router = express.Router();

router.post('/', async (req, res) => {
  const response = await services.userPostMiddleware(req);

  if (response.err) return res.status(response.err.status).json(response.err);

  res.status(201).json(response);
});

router.get('/', async (req, res) => {
  try {
    const response = await authToken(req);

    if (response.err) return res.status(response.err.status).json(response.err);

    const data = await User.findAll();

    res.status(200).json(data);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await authToken(req);

    if (response.err) return res.status(response.err.status).json(response.err);

    const data = await userById(req, res);

    res.status(200).json(data);
  } catch {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
