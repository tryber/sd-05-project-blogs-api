const express = require('express');

const rescue = require('express-rescue');

const postRouter = express.Router();

const { User, Post } = require('../models');

const { verifyToken } = require('../middlewares/verifyToken');

// const { createToken } = require('../services/createToken');

// 6 - Sua aplicação deve ter o endpoint POST /post

// postRouter.post(
//   '/',
//   verifyToken,
//   rescue(async (req, res) => {
//     const { title, content } = req.body;
//     const { id: idUser } = req.payload.userData;

//     await Post.create({ title, content, idUser, published: Date.now(), updated: Date.now(), });

//     return res.status(201).json({ title, content, idUser });
//   }),
// );

// // 3 - Sua aplicação deve ter o endpoint GET /user

// userRouter.get(
//   '/',
//   verifyToken,
//   rescue(async (req, res) => {
//     const listUsers = await User.findAll();
//     res.status(200).json(listUsers);
//   }),
// );

// // 4 - Sua aplicação deve ter o endpoint GET /user/:id
// userRouter.get(
//   '/:id',
//   verifyToken,
//   rescue(async (req, res) => {
//     const { id } = req.params;

//     const idUser = await User.findOne({ where: { id } });

//     if (!idUser) return res.status(404).json({ message: 'Usuário não existe' });

//     return res.status(200).json(idUser);
//   }),
// );

// // 5 - Sua aplicação deve ter o endpoint DELETE /user/me
// userRouter.get(
//   '/me',
//   verifyToken,
//   rescue(async (req, res) => {
//     const { id } = req.payload.userData;
//     await User.destroy({ where: { id } });
//     return res.status(204).send();
//   }),
// );

module.exports = postRouter;
