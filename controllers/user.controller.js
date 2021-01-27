const { Router } = require('express');
const user = require('../services/user.service');

const userRouter = Router();

userRouter.get('/', (_req, res) => {
  res.send();
});

userRouter.post('/user', user.registerUser, (req, res) => {
  res.status(201).json(req.data);
});

module.exports = userRouter;
