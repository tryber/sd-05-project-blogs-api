const express = require('express');
const { User } = require('../models');

const service = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await service.checkBody(displayName, email, password);
    User.create({ displayName, email, password, image })
      .then((user) => res.status(201).json(user));
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
});

module.exports = router;
