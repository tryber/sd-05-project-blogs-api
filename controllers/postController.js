const { Post } = require('../models');

const { postService } = require('../services/index');

const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    postService.checkBodyPost(title, content);
    const createdBy = req.validatedTokenInfo.id;
    Post.create({ title, content, userId: createdBy })
      .then((post) => res.status(201).json(post));
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
};
