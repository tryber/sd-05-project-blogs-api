const express = require('express');

const router = express.Router();
const { createToken } = require('../helper/token');

const { validateEmail, validatePassword, validateUser } = require('../middleware/loginValidation');

router.post('/',
  validateEmail,
  validatePassword,
  validateUser,
  async (req, res) => {
    const { id, email } = req.user;
    const token = createToken({ id, email });
    console.log('login controller L15t', token);
    return res.status(200).json({ token });
  });

module.exports = router;
