const { Post } = require('../models');

const atualizar = async (req, res, next) => {
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

module.exports = atualizar;
