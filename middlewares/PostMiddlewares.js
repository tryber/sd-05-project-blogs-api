const ErrorsEnum = require('../enumerators/ErrorsEnums');
const { Posts } = require('../models');

const verifyPost = async (req, res, next) => {
  const { content, title } = req.body;
  if (!content) {
    return res.status(400).json(ErrorsEnum.missingContent);
  }
  if (!title) {
    return res.status(400).json(ErrorsEnum.missingTitle);
  }
  next();
};

const verifyPostId = async (req, res, next) => {
  const { id } = req.params;
  const pData = await Posts.findAll({ where: { id } });
  if (pData.length === 0) {
    return res.status(404).json(ErrorsEnum.missingPost);
  }
  next();
};

module.exports = { verifyPost, verifyPostId };
