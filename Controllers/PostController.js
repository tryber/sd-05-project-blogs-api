const rescue = require('express-rescue');
const postService = require('../Service/PostService');

const createPost = rescue(async (req, res, next) => {
  try {
    const titleAndContent = req.body;
    const { id: userId } = req.data;

    console.log(userId);

    const posted = await postService.createPost(titleAndContent, userId);
    return res.status(201).json(posted);
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});

const editPost = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.data;
    const titleAndContent = req.body;

    postService.editPost(titleAndContent, id, userId);
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});

module.exports = { createPost, editPost };
