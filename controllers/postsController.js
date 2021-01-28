const express = require('express');

const rescue = require('express-rescue');

const { Post, User } = require('../models');

const postRouter = express.Router();
const {
  validateToken,
  validatePost,
} = require('../middlewares');

const { Op } = require('sequelize');

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

// 10 - Sua aplicação deve ter o endpoint GET post/search?q=:searchTerm
postRouter.get(
  '/search',
  validateToken,
  rescue(async (req, res) => {
    const { q } = req.query;
    const postsBySearch = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
    });
    // Sequelize operators https://sequelize.org/master/manual/model-querying-basics.html#operators
    // How to write it on Postman https://learning.postman.com/docs/sending-requests/requests/#:~:text=authentication%20and%20headers.-,Sending%20parameters,field%20and%20the%20Params%20tab.&text=To%20send%20a%20query%20parameter,be%20reflected%20in%20the%20others.
    // Honestidade acadêmica: PR do aluno Felipe Vieira para lembrar de tirar password
    return res.status(200).json(postsBySearch);
    // naturally sends empty [] in case of no match
  }),
);
// Reference for Trybe content on req.query: Block 26 - crush manager project 
// Req10 before req8 because search term would be interpreted as id, returning l77.

// 8 - Sua aplicação deve ter o endpoint GET post/:id
postRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const postById = await Post.findOne({ where: { id }, include: { model: User, as: 'user' } });
    // also possible:
    // const postById = await User.findByPk({ id, include: { model: User, as: 'user' } });
    if (!postById) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(postById);
  }),
);

// 9 - Sua aplicação deve ter o endpoint PUT /post/:id
postRouter.put(
  '/:id',
  validateToken,
  validatePost,
  rescue(async (req, res) => {
    // 1. Find & see post
    const { id } = req.params;
    // console.log(`Post id: ${id}`);
    const postById = await Post.findByPk(id);
    // 2. Check if user who made the post is the same as user trying to update post
    const authenticatedUserId = req.userPayload.id;
    // console.log(`Token user id: ${authenticatedUserId}`);
    // console.log(`Post user id: ${postById.userId}`);
    if (postById.userId !== authenticatedUserId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    // 3. Update the post
    const { title, content } = req.body;
    await Post.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId: postById.userId });
  }),
);

// 11 - Sua aplicação deve ter o endpoint DELETE post/:id
postRouter.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    // 1. Check if post exists
    const postById = await Post.findByPk(id);
    if (!postById) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    // 2. Check if user is authorized to delete
    const authenticatedUserId = req.userPayload.id;
    if (postById.userId !== authenticatedUserId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    // 3. Delete
    await Post.destroy({ where: { id } });
    return res.status(204).send();
  }),
);

module.exports = postRouter;
