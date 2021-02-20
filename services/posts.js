const { Post } = require('../models');
const { decodePayload, checkToken } = require('../auth/jwt.auth');

const create = async (title, content, authorization) => {
  checkToken(authorization);
  const { payload } = decodePayload(authorization);
  console.log(payload.id);
  const post = await Post.create({ title, content, userId: payload.id });
  if (!post) {
    throw new Error('Campos inválidos');
  }

  return post;
};

module.exports = {
  create,
};
