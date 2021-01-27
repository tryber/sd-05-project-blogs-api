const express = require('express');

const rescue = require('express-rescue');

// const { User } = require('../models');

const loginRouter = express.Router();
const {
  validateLoginEmail,
  validateExistingEmail,
  validateLoginPassword,
} = require('../middlewares');

const generateJWT = require('../services/generateToken');

// 2 - Sua aplicação deve ter o endpoint POST /login
loginRouter.post(
  '/',
  validateLoginEmail,
  validateExistingEmail,
  validateLoginPassword,
  rescue(async (req, res) => {
    const userLoginData = req.existingUser;
    // to get both email, password and id
    // see login middleware to understand where req.existingUser comes from
    const token = await generateJWT(userLoginData);
    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
