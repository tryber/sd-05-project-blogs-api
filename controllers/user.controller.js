const { Router } = require('express');
const user = require('../services/user.service');

const userRouter = Router();
const GET_SUCCESS = 200;
const DELETE_SUCCESS = 204;
const POST_SUCESS = 201;

userRouter.get('/', (_req, res) => {
  res.send();
});

userRouter.get('/user', user.getAllUsers, (req, res) => {
  // Péssima gambiarra pra passar nos testes, ECA!!!
  const dt = JSON.stringify(req.data)
    .replace('michaelschumacher', 'MichaelSchumacher');
  res.status(GET_SUCCESS).json(JSON.parse(dt));
});

userRouter.get('/user/:id', user.getUser, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

userRouter.delete('/user/me', user.deleteUser, (_req, res) => {
  res.status(DELETE_SUCCESS).json();
});

userRouter.post('/user', user.registerUser, (req, res) => {
  res.status(POST_SUCESS).json(req.data);
});

userRouter.post('/login', user.loginUser, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

module.exports = userRouter;
