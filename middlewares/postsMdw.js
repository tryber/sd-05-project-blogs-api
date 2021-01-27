class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validatePost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return next(
      new CodeError('"title" is required', 'invalid_data'),
    );
  }
  if (!content) {
    return next(
      new CodeError('"content" is required', 'invalid_data'),
    );
  }
  next();
};

module.exports = validatePost;
