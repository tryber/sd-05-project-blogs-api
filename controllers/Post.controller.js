const { createPost } = require('../services/Post.services');
const { validateToken } = require('../middlewares/AuthMiddlewares');

module.exports = {
  createPost: async (req, res, _next) => {
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const { dataValues: { id } } = await validateToken(token);
    const newPost = await createPost(title, content, id);
    return res.status(201).json(newPost);
  },
};
