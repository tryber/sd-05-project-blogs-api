const { Posts } = require('../models');

const update = async (title, content, id, userId) => {
  const validatePost = await Posts.findOne({ where: { id } });
  if (!title) return { error: true, message: '"title" is required', statusCode: 400 };
  if (!content) return { error: true, message: '"content" is required', statusCode: 400 };
  if (validatePost.userId !== userId) {
    return {
      error: true,
      message: 'Usuário não autorizado',
      statusCode: 401,
    };
  }
  await Posts.update({ title, content }, { where: { id, userId } });
  return { title, content, userId };
};

module.exports = {
  update,
};
