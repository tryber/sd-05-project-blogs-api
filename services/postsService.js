const { Post } = require('../models');
const { User } = require('../models');

function PostException(message, validatorKey) {
  this.message = message;
  this.validatorKey = validatorKey;

  return {
    errors: [{
      message,
      validatorKey,
    }],
  };
}

const create = async (post, userId) => {
  const { content, title } = post;
  if (!content) {
    throw new PostException('"content" is required', 'is_required');
  }
  if (!title) {
    throw new PostException('"title" is required', 'is_required');
  }
  return Post.create({ content, title, userId });
};

const getAll = async () => {
  const posts = await Post.findAll({
    attributes: ['id', 'published', 'updated', 'title', 'content'],
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
  }).then((data) => data);
  return posts;
};

const getOne = async (postId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new PostException('Usuário não existe', 'not_found');
  const { id, displayName, email, image } = post.dataValues;
  return { id, displayName, email, image };
};

const exclude = async (id) => Post.destroy({ where: { id } });

module.exports = {
  create,
  getAll,
  getOne,
  exclude,
};
