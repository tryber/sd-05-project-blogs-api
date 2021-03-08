const express = require('express');
const middleware = require('../middleware');
const validaEmailExist = require('../services/validaEmailExist');

const { User } = require('../models');

const router = express.Router();

const middlewareValid = [
  middleware.displayName,
  middleware.email,
  middleware.password,
];

router.post('/', middlewareValid, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const isUsed = await validaEmailExist(email);
    if (isUsed.isError) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
    const result = await User.create({ displayName, email, password, image });
    console.log('Result', result.id);
    const token = middleware.createToken({
      id: result.id,
      displayName,
      iss: 'post_api',
    });
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;
