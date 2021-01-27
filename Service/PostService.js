const { Post } = require('../models');
const { StatusError } = require('../Utils');

const createPost = async ({ title = null, content = null }, userId) => {
  if (!title) throw new StatusError('"title" is required', 400);
  if (!content) throw new StatusError('"content" is required', 400);

  console.log('====================================');
  console.log(userId);
  console.log('====================================');

  return Post.create({ title, content, userId });
};

const editPost = async (titleAndContent, id, userId) => {
  const post = await Post.findOne({ where: { id } });

  if (userId !== post.userId) throw new StatusError('Usuário não autorizado', 401);
  console.log('====================================');
  console.log(post);
  console.log('====================================');
}

module.exports = { createPost, editPost };
