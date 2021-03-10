const { InvalidData } = require('../../utils/errors');

const validaPassword = async (req, res, next) => {
  let { password } = req.body;
  if (password == undefined) password = ''
  if (!password) next(new InvalidData('"password" is required'));
  if (password.length < 6) next(new InvalidData('"password" length must be 6 characters long'));

  next();
};

module.exports = validaPassword;

