const { postsService } = require('../service');

const samePostAuthor = async (req, res, next) => {
  const authenticatedId = req.user.id;
  const postId = req.params.id;

  const post = await postsService.getOnePost(postId);
  if (parseInt(postId, 10) !== parseInt(authenticatedId, 10)) {
    return res.status(401).json({
      message: 'Usuário não autorizado',
    });
  }

  req.post = post;
  next();
};

module.exports = samePostAuthor;
