const express = require('express');

const router = express.Router();

const { createToken } = require('../helper/token')

const {
  validateEmail,
  validatePassword,
  validateLogin,
} = require('../middleware/userValidation');

router.post('/',
  validateEmail,
  validatePassword,
  validateLogin,
  async (req, res) => {
    const token = createToken(req.body);
    res.status(201).json({ token });
  });

module.exports = router;
