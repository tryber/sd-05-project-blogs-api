const express = require('express');
const { createToken } = require('../auth/token');

const loginValidation = require('../services/loginValidation');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = await loginValidation(req);

  if (user.err) return res.status(user.err.status).json(user.err);

  const token = createToken({ user });

  res.status(200).json({ token });
});

module.exports = router;
