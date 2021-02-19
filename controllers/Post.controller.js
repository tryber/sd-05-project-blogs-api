const PostService = require('../services/Post.services');
const { validateToken } = require('../middlewares/AuthMiddlewares');

const createPost = async (req, res, _next) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const { dataValues: { id } } = await validateToken(token);
  const newPost = await PostService.createPost(title, content, id);
  return res.status(201).json(newPost);
};

const getPosts = async (_req, res, _next) => {
  const posts = await PostService.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res, _next) => {
  const { id } = req.params;
  const post = await PostService.getPostById(id);
  return res.status(200).json(post);
};

const updatePost = async (req, res, _next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const { dataValues: { id: userId } } = await validateToken(token);
  const modPost = await PostService.updatePost(id, title, content, userId)
    .then(() => PostService.getPostById(id));
  return res.status(200).json(modPost);
};

const searchPost = async (req, res, _next) => {
  const { q } = req.query;
  const result = await PostService.searchPost(q);
  return res.status(200).json(result);
};

module.exports = {
  createPost, getPosts, getPostById, updatePost, searchPost,
};
