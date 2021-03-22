const express = require('express');

const rescue = require('express-rescue');

const userRouter = express.Router();

const { User } = require('../models');

const createToken = require('../services/createToken');

// 1 - Sua aplicação deve ter o endpoint POST /user

userRouter.post(
  '/',
  rescue(async (req, res) => {
    console.log('cheguei mamãe');
    console.log(User);
    const { displayName, email, password, image } = req.body;
    console.log(displayName);
    console.log(email);
    console.log(password);
    console.log(image);

    // const verifyUser = await User.findOne({ where: { email } });

    // if (verifyUser) {
    //   return res.status(409).json({ message: 'Usuário existente' });
    // }

    const addUser = await User.create({ displayName, email, password, image });
    const token = createToken(addUser);
    return res.status(201).json({ token });
  }),
);

module.exports = userRouter;
