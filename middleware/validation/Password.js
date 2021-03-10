class GeneralError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validaPassword = async (req, res, next) => {
  let { password } = req.body;
  if (password === undefined) password = '';
  if (!password) next(new GeneralError('"password" is required', 'invalid_data'));
  if (password.length < 6) next(new GeneralError('"password" length must be 6 characters long', 'invalid_data'));

  next();
};

module.exports = validaPassword;
