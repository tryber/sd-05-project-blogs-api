const { Router } = require('express');
const rescue = require('express-rescue');

const postFactory = require('../service/post/postFactory');
const authToken = require('../middlewares/authToken');

const post = Router();

post.post(
  '/',
  authToken,
  rescue(async (req, res) => {
    const token = req.headers.authorization;
    const { title, content } = req.body;
    const newPost = await postFactory().createPost(title, content, token);

    if (newPost.error) {
      return res.status(newPost.statusCode).json({ message: newPost.message });
    }
    return res.status(201).json(newPost);
  }),
);

module.exports = post;
