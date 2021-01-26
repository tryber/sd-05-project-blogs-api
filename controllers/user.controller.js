const { Router } = require('express');
const user = require('../services/user.service');

const userRouter = Router();

userRouter.get('/', user.getAllUsers, (req, res) => {
  res.status(200).json(req.data);
});

userRouter.post('/', user.registerUser, (req, res) => {
  res.status(201).json(req.data);
});

module.exports = userRouter;
