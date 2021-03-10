const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');

const createToken = require('../services/createToken');

const validaEmail = require('../middleware/validation/Email');
const validaDisplay = require('../middleware/validation/DisplayName');
const validaPassword = require('../middleware/validation/Password');
const validaEmailExiste = require('../middleware/validation/isExistEmail');

const userRouter = express.Router();

const validation = [
  validaEmail,
  validaDisplay,
  validaPassword,
  validaEmailExiste,
];

userRouter.post('/', validation, rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    console.log("Requisição", displayName, email, password, image )
    const user = await User.create({ displayName, email, password, image });
    const token = await createToken(user);
    return res.status(201).json({ token });
  }),
);

userRouter.get(
  '/',
  rescue(async (_req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  }),
);

module.exports = userRouter;
