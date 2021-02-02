const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const verifyToken = require('../middlewares/verifyToken');
const verifyWithJoi = require('../middlewares/verifyWithJoi');

const { Post } = require('../models');

const postsRouter = express.Router();

const schema = Joi.object({
  title: Joi.string().required().not().empty(),
  content: Joi.string().required().not().empty(),
});

postsRouter.post(
  '/',
  verifyToken,
  verifyWithJoi(schema),
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.payload.userData;

    await Post.create({ title, content, userId, published: Date.now(), updated: Date.now() });

    return res.status(201).json({ title, content, userId });
  }),
);

module.exports = postsRouter;
