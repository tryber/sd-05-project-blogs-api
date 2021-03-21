const express = require('express');
const rescue = require('express-rescue');
const service = require('../services/userService');

const userRouter = express.Router();
const errorMiddleware = require('../middlewares/err');

userRouter.post('/', (async (req, res, next) => {
  try {
    const { displayName, email, password, image} = req.body
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log("L14 CONTROLLER", err)
    next(err);
  }
}));

// userRouter.use(errorMiddleware);

module.exports = userRouter;
