const { Post, User } = require('../models');

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

const getAllPosts = async (req, res) => {
  try {
    await Post.findAll({
      include: [{ model: User, as: 'user' }], // o as tem que ser igual ao model do post.
      attributes: { exclude: ['userId'] },
    }).then((post) => {
      res.status(200).json(post);
    });
  } catch (err) {
    return res.status(400).send({ message: 'Deu ruim no bd' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByPk(id, {
      include: [{ model: User, as: 'user' }], // o as tem que ser igual ao model do post.
      attributes: { exclude: ['userId'] },
    }).then((post) => {
      if (post === null) {
        return res.status(404).send({ message: 'Post não existe' });
      }
      return res.status(200).json(post);
    });
  } catch (err) {
    return res.status(400).send({ message: 'Deu ruim no bd' });
  }
};

module.exports = {
  create,
  getAllPosts,
  getById,
};
