const ErrorsEnum = require('../enumerators/ErrorsEnums');

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

module.exports = { verifyPost };
