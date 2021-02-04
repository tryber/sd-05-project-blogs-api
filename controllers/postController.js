const { Op } = require('sequelize');
const { Post, User } = require('../models');

const { postService } = require('../services/index');
const CodeError = require('../errorClass/errorClass');

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
      if (post === null) throw new CodeError(404, 'Post não existe');

      return res.status(200).json(post);
    });
  } catch (err) {
    return res.status(err.code).send({ message: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (post === null) throw new CodeError(404, 'Post não existe');
    if (post.userId !== req.validatedTokenInfo.id) throw new CodeError(401, 'Usuário não autorizado');
    postService.checkBodyPost(title, content);

    post.title = title; //  ref1
    post.content = content;
    post.updated = new Date();

    await post.save();

    return res.status(200).json({ title: post.title, content: post.content, userId: post.userId });
  } catch (err) {
    return res.status(err.code).send({ message: err.message });
  }
};

const getBySearchTerm = async (req, res) => {
  //  ref2 e 3
  const { q } = req.query;
  try {
    await Post.findAll({
      include: [{ model: User, as: 'user' }],
      attributes: { exclude: ['userId'] },
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          // { content: { [Op.like]: '%' + q + '%' } }, ref4
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
    }).then((post) => {
      if (post === null) return res.status(200).send([]);
      return res.status(200).json(post);
    });
  } catch (err) {
    return res.status(err.code).send({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (post === null) throw new CodeError(404, 'Post não existe');
    if (post.userId !== req.validatedTokenInfo.id) throw new CodeError(401, 'Usuário não autorizado');
    await Post.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return res.status(204).send();
  } catch (err) {
    return res.status(err.code).send({ message: err.message });
  }
};

module.exports = {
  create,
  getAllPosts,
  getById,
  update,
  getBySearchTerm,
  deletePost,
};

//  ref1: https://sequelize.org/master/manual/model-instances.html
//  ref2: https://sequelize.org/master/manual/model-querying-basics.html
//  ref3: https://stackoverflow.com/questions/31258158/how-to-implement-search-feature-using-sequelizejs
//  ref4: https://eslint.org/docs/rules/prefer-template
