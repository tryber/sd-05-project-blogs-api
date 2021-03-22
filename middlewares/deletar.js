/*const { Post } = require('../models');
// const authService = require('../services/post');

const deletar = async (req, res, next) => {
  const { id } = req.params;
  const somePost = await Post.findOne({ where: { id } });
  if (!somePost) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  const checkUser = async (userId) => {
    const { id } = req.user;
    if (id !== userId) {
      return { err: { status: 401, message: 'Usuário não autorizado' } };
    }
    return null;
  };

  const checkAll = await checkUser(req, somePost.userId);
  if (checkAll) {
    return res.status(checkAll.err.status).json(checkAll.err);
  }

  next();
};

module.exports = deletar;
*/
const { Post } = require('../models');

const deletar = async (req, res, next) => {
  const { id } = req.params;
  const somePost = await Post.findOne({ where: { id } });
  if (!somePost) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (somePost.userId !== req.user.id) {
    console.log(req.params.id, 'params');
    console.log(req.user.id, 'user');
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  return next();
};

module.exports = deletar;