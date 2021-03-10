const { InvalidData } = require('../../utils/errors');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) next(new InvalidData('"email" is required'));

  const regexEmail = RegExp(/\S+@\S+\.\S+/, 'i');

  if (!regexEmail.test(email)) next(new InvalidData('"email" must be a valid email'));

  next();
};

module.exports = validateEmail;
