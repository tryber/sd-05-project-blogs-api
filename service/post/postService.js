const Joi = require('joi');
const decodeToken = require('../../middlewares/decodeToken');

const validatePost = (title, content) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate({ title, content });
};

const createPost = (Post) => async (title, content, token) => {
  const isPostValid = validatePost(title, content);
  if (isPostValid.error) {
    return {
      error: true,
      message: isPostValid.error.message,
      statusCode: 400,
    };
  }

  const { id: userId } = decodeToken(token);
  const createdPost = await Post.create({
    title,
    content,
    userId,
    published: Date.now(),
    updated: Date.now(),
  });
  // Refatorar
  const {
    dataValues: { id: _, published: __, updated: ___, ...postData },
  } = createdPost;

  return postData;
};
// Opção 2
// delete createdPost.dataValues.id;
// delete createdPost.dataValues.published;
// delete createdPost.dataValues.updated;

// const { dataValues } = createdPost;

// return dataValues;

const getAllPosts = (Post, User) => async () => {
  const allPosts = await Post.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return allPosts;
};

const getPostById = (Post, User) => async (id) => {
  const getPost = await Post.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!getPost) {
    return {
      error: true,
      message: 'Post não existe',
      statusCode: 404,
    };
  }

  return getPost;
};

const updatePost = (Post) => async (title, content, id, token) => {
  const isUpdateValid = validatePost(title, content);

  if (isUpdateValid.error) {
    return {
      error: true,
      message: isUpdateValid.error.message,
      statusCode: 400,
    };
  }

  const { id: userId } = decodeToken(token);

  const updatedPost = await Post.update({ title, content }, { where: { id, userId } });
  if (updatedPost[0] === 0) {
    return {
      error: true,
      message: 'Usuário não autorizado',
      statusCode: 401,
    };
  }
  return { title, content, userId };
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
