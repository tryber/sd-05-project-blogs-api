const express = require('express');

const rescue = require('express-rescue');

const { Post, User } = require('../models');

const postRouter = express.Router();
const {
  validateToken,
  validatePost,
} = require('../middlewares');

// const generateJWT = require('../services/generateToken');

// 6 - Sua aplicação deve ter o endpoint POST /post
postRouter.post(
  '/',
  validateToken,
  validatePost,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.userPayload;
    // console.log(id);
    await Post.create({ title, content, userId: id });
    return res.status(201).json({ title, content, userId: id });
  }),
);

// 7 - Sua aplicação deve ter o endpoint GET /post
postRouter.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const allPosts = await Post.findAll(({ include: { model: User, as: 'user' } }));
    // "include" indicates to Sequelize req's settings:
    // property "model" to tell what table is used
    // & as needs to be same name as in assocation written into the present model (Post).
    res.status(200).json(allPosts);
  }),
);

// 8 - Sua aplicação deve ter o endpoint GET post/:id
postRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const postById = await User.findByPk({ id, include: { model: User, as: 'user' } });
    // also possible:
    // const postById = await Post.findOne({ where: { id }, include: { model: User, as: 'user' } });
    if (!postById) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(postById);
  }),
);

// 9 - Sua aplicação deve ter o endpoint PUT /post/:id
// postRouter.put(
//   '/:id',
//   rescue(async (req, res) => {
//   const { title, content } = req.body;
//   const updatedPost = Post.update(
//     { title, content },
//     {
//       where: { id: req.params.id },
//     }
//   );
//   return res.status(200).json(updatedPost);
//   }),
// );

// 10 - Sua aplicação deve ter o endpoint GET post/search?q=:searchTerm

// 11 - Sua aplicação deve ter o endpoint DELETE post/:id
// // 5 - Sua aplicação deve ter o endpoint DELETE /user/me
// postRouter.delete(
//   '/:id',
//   validateToken,
//   rescue(async (req, res) => {
//     const { id } = req.params;
//     await User.destroy({ where: { id } });
//     return res.status(204).send();
//   }),
// );

module.exports = postRouter;
