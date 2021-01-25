const express = require('express');
const userRouter = express.Router();
const rescue = require('express-rescue');
const { createUser } = require('../Service/UserService');

userRouter.post(
  '/',
  rescue((req, res) => {
    const userBody = req.body;

    createUser

  }),
);

module.exports = userRouter;
