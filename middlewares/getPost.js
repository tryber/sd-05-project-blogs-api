const { Post, User } = require('../models');

const getPost = async (req, res, next) => {
  const { id } = req.params;

  const data = await Post.findOne({
    where: { id },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });

  if (!data) return res.status(404).send({ message: 'Post não existe' });

  req.postData = data;

  next();
};

module.exports = getPost;
