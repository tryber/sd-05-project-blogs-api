const express = require('express');
const MiddleError = require('../middlewares/middlewareErrorUser');
const MiddleEmail = require('../middlewares/validEmail');
const MiddlePassword = require('../middlewares/validPassword');
const { Users } = require('../models');
const { checkEmailPassDB } = require('../services/loginService');

const loginRouter = express.Router();

const middleWareUser = [MiddleEmail, MiddlePassword];

loginRouter.post('/', middleWareUser, async (req, res, next) => {
  const { email, password } = req.body;
  const err = await checkEmailPassDB(password, email);
  if (err.isError) {
    next(err);
  }
  delete err.isError;
  res.status(200).json({ token: err.token });

});

loginRouter.use(MiddleError);

module.exports = loginRouter;
