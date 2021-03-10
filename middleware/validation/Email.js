class GeneralError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) next(new GeneralError('"email" is required', 'invalid_data'));

  const regexEmail = RegExp(/\S+@\S+\.\S+/, 'i');

  if (!regexEmail.test(email)) next(new GeneralError('"email" must be a valid email', 'invalid_data'));

  next();
};

module.exports = validateEmail;
