const { Post } = require('../models');

const create = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const response = await Post.create({ title, content, userId: id });

  res.status(201).json(response);
};

module.exports = { create };
