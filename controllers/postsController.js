const express = require('express');
// const { Post } = require('../models');
const postRouter = express.Router();
// const rescue = require('express-rescue');

// postRouter.post(
//   '/',
//   // middlewares
//   rescue(async (req, res) => {
//   const { displayName, email, password, image } = req.body;
//   const createUser = await User.create({ displayName, email, password, image });
// }));

module.exports = postRouter;
