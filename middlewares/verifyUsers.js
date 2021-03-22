const userModel = require('../models/users');

const verifyName = async (req, _res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return { isError: true, message: '"displayName" length must be at least 8 characters long', status: 400 };
  }
  next();
};

const verifyPassword = async (req, _res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return { isError: true, message: '"password" length must be 6 characters long', status: 400 };
  }

  if (password === undefined || password === '' || !password) {
    return { isError: true, message: '"password" is required', status: 400 };
  }
  next();
};

const verifyEmail = async (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (!emailRegex.test(email)) {
    return { isError: true, message: '"email" must be a valid email', status: 400 };
  }

  if (!email) {
    return { isError: true, message: '"email" is required', status: 400 };
  }
  next();
};

module.exports = {
  verifyName,
  verifyPassword,
  verifyEmail,
};
