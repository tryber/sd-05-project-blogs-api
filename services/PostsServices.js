// const jwt = require('jsonwebtoken');
const { Posts } = require('../models');

const postValidation = (req, res, next) => {
  const { title, content } = req.body;
  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const postAuth = async (req, res, next) => {
  const userId = req.userInformation.user.id;
  const { id } = req.params;
  try {
    const post = await Posts.findOne({
      where: {
        id,
      },
    });
    if (Number(post.dataValues.userId) !== Number(userId)) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    next();
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = { postValidation, postAuth };
