const { Router } = require('express');
const user = require('../services/user.service');

const userRouter = Router();

userRouter.get('/', (_req, res) => {
  res.send();
});

userRouter.get('/user', user.getAllUsers, (req, res) => {
  res.status(200).json(req.data);
});

userRouter.get('/user/:id', user.getUser, (req, res) => {
  res.status(200).json(req.data);
});

userRouter.post('/user', user.registerUser, (req, res) => {
  res.status(201).json(req.data);
});

userRouter.post('/login', user.loginUser, (req, res) => {
  res.status(200).json(req.data);
});

module.exports = userRouter;
