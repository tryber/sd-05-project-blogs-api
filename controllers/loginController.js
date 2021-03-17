const express = require('express');

const router = express.Router();

const { createToken } = require('../helper/token');

const { validateEmail, validatePassword, validateUser } = require('../middleware/loginValidation');

router.post('/',
  validateEmail,
  validatePassword,
  validateUser,
  (req, res) => {
    const token = createToken(req.body);
    return res.status(200).json({ token });
  });

module.exports = router;
