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

    const updatedPost = await postService.editPost(titleAndContent, id, userId);
    return res.status(200).json(updatedPost);
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});
const deletePost = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.data);
    const { id: userId } = req.data;

    await postService.deletePost(id, userId);
    return res.status(204).json();
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});

const getAll = rescue(async (req, res) => {
  const allPosts = await postService.getAll();
  res.status(200).json(allPosts);
});

const getPostById = rescue(async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostById(id);
    res.status(200).json(post);
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
});

module.exports = { createPost, editPost, deletePost, getAll, getPostById };
