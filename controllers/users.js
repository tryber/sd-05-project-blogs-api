const express = require('express');

const userRouter = express.Router();
const { User } = require('../models/users');

const createToken = require('../services/createToken');

const { verifyName, verifyPassword, verifyEmail } = require('../middlewares/verifyUsers');

// 1 - Sua aplicação deve ter o endpoint POST /user

userRouter.post(
  '/',
  // verifyEmail,
  // verifyPassword,
  // verifyName,
  async (req, res) => {
    console.log("cheguei mamãe");
    const { displayName, email, password, image } = req.body;
    const addUser = await User.create({ displayName, email, password, image });
    // if (addUser.isError) { return res.status(addUser.status).json({ message: addUser.message }); }
    // const token = await createToken(addUser);
    res.status(201).json(addUser);
  },
);

module.exports = userRouter;
