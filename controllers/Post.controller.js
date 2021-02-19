const { createPost, getPosts, getPostById } = require('../services/Post.services');
const { validateToken } = require('../middlewares/AuthMiddlewares');

module.exports = {
  createPost: async (req, res, _next) => {
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const { dataValues: { id } } = await validateToken(token);
    const newPost = await createPost(title, content, id);
    return res.status(201).json(newPost);
  },
  getPosts: async (_req, res, _next) => {
    const posts = await getPosts();
    return res.status(200).json(posts);
  },
  getPostById: async (req, res, _next) => {
    const { id } = req.params;
    const post = await getPostById(id);
    return res.status(200).json(post);
  },

};
