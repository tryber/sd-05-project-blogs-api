const { Users } = require('../models');

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  return next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!emailRegex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6 && password.length > 0) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (password.length === 0) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) return res.status(400).json({ message: '"password" is required' });
  return next();
};

const checkUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users
    .findOne({ where: { email } });
  if (user) return res.status(409).json({ message: 'Usuário já existe' });
  return next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  checkUserEmail,
};
