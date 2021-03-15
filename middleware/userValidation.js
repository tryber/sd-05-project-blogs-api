const { Users } = require('../models');

const errorMessage = (message) => ({ message });

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    console.log('Passou no verifyName');
    return res
      .status(400)
      .json(
        errorMessage('"displayName" length must be at least 8 characters long'),
      );
  }
  return next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!emailRegex.test(email)) return res.status(400).json(errorMessage('"email" must be a valid email'));
  if (!email) return res.status(400).json(errorMessage('"email" is required'));
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6 && password.length > 0) {
    return res
      .status(400)
      .json(errorMessage('"password" length must be 6 characters long'));
  }
  if (password.length === 0) {
    return res
      .status(400)
      .json(errorMessage('"password" is not allowed to be empty'));
  }
  if (!password) return res.status(400).json(errorMessage('"password" is required'));
  console.log(errorMessage);
  return next();
};

const checkUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users
    .findOne({ where: { email } });
  if (user) return res.status(409).json(errorMessage('Usuário já existe'));
  return next();
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) return res.status(400).json(errorMessage('Campos inválidos'));
  if (user.password !== password) return res.status(400).json(errorMessage('Campos inválidos'));
  return next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  checkUserEmail,
  validateLogin,
};
