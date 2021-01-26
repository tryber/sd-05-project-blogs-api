const express = require('express');
const { User } = require('../models');
const { createToken } = require('../auth/token');

const router = express.Router();

router.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => {
      const token = createToken({ newUser });
      res.status(200).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;
