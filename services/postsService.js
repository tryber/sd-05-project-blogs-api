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

const update = async (postId, userId, newPost) => {
  const { content, title } = newPost;
  const actualPost = await Post.findOne({ where: { id: postId } });
  if (!content) {
    throw new PostException('"content" is required', 'is_required');
  }
  if (!title) {
    throw new PostException('"title" is required', 'is_required');
  }
  if (actualPost.userId !== userId) {
    throw new PostException('Usuário não autorizado', 'unauthorized');
  }
  await Post.update({ content, title }, { where: { id: postId, userId } });
  return { title, content, userId };
};

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
  const [post] = await Post.findAll({
    attributes: ['id', 'published', 'updated', 'title', 'content'],
    where: { id: postId },
    include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
  }).then((data) => data);
  if (!post) throw new PostException('Post não existe', 'not_found');
  return post;
};

const exclude = async (id) => Post.destroy({ where: { id } });

module.exports = {
  create,
  getAll,
  getOne,
  exclude,
  update,
};
