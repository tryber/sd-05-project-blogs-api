const express = require('express');
const { getToken } = require('../middlewares/authentication');

const loginValid = require('../services/login');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const user = await loginValid(req);
  if (user.err) return res.status(user.err.status).json(user.err);

  const token = getToken(user.dataValues);

  res.status(200).json({ token });
});

module.exports = loginRouter;
