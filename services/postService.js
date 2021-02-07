const CodeError = require('../errorClass/errorClass');

const validateTitle = (title) => {
  if (!title) throw new CodeError(400, '"title" is required');
};

const validateContent = (content) => {
  if (!content) throw new CodeError(400, '"content" is required');
};

const checkBodyPost = (title, content) => {
  validateTitle(title);
  validateContent(content);
};

module.exports = {
  checkBodyPost,
};
