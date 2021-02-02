const postService = require('../services/postService');

const isAuthor = async (req, res, next) => {
  const authorId = req.user.id;
  const postId = req.params.id;

  const post = await postService.getPostById(postId);
  if (parseInt(postId, 10) !== parseInt(authorId, 10)) {
    return res.status(401).json({
      message: 'Usuário não autorizado',
    });
  }

  req.post = post;
  next();
};

module.exports = isAuthor;
