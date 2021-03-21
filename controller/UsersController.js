const express = require('express');
const service = require('../services/userService');
const errMiddleware = require('../middlewares/err')

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log("Catch UserController", err);
    next(err);
  }
});

userRouter.use(errMiddleware.createUserValidator);

module.exports = userRouter;
