const { Posts } = require('../models');
const checkOwner = require('../services/checkOwner');

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  const post = await Posts.findOne({ where: { id } });

  if (!post) return res.status(404).send({ message: 'Post não existe' });

  const check = await checkOwner(req, post.userId);
  if (check) return res.status(check.err.status).json(check.err);

  next();
};

module.exports = deletePost;
