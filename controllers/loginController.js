const express = require('express');
const { getToken } = require('../middlewares/authentication');

const loginValid = require('../services/login');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const loginUser = await loginValid(req);

  if (loginUser.err) return res.status(loginUser.err.status).json(loginUser.err);

  const token = getToken({ loginUser });

  res.status(200).json({ token });
});

module.exports = loginRouter;
