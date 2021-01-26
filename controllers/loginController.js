const express = require('express');
// const { User } = require('../models');
const loginRouter = express.Router();
// const rescue = require('express-rescue');

// loginRouter.post(
//   '/',
//   // middlewares
//   rescue(async (req, res) => {
//   const { displayName, email, password, image } = req.body;
//   const createUser = await User.create({ displayName, email, password, image });
// }));

module.exports = loginRouter;

// const usersServices = require('../services/usersServices');
// const generateJWT = require('../services/generateJWT');

// // 2 - Crie um endpoint para o login de usuários
// loginRouter.post(
//   '/',
//   rescue(async (req, res) => {
//     const { email, password } = req.body;
//     // I - Check login data
//     const user = await usersServices.login(email, password);
//     if (!user) return res.status(400).json({ message: 'Login was not possible' });
//     // console.log(user);
//     // II - Generate and return JWT
//     const token = await generateJWT(user);
//     return res.status(200).json({ token });
//   }),
// );

// module.exports = loginRouter;
