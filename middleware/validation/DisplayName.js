class GeneralError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validateName = async (req, _res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    next(new GeneralError('"displayName" length must be at least 8 characters long', 'invalid_data'));
  }
  next();
};

module.exports = validateName;
