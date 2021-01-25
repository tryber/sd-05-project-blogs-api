const { sendError } = require('../services');

const verifyEmail = async (req) => {
  const { email } = req.body;

  if (email === '') {
    return {
      status: 400,
      err: sendError('"email" is not allowed to be empty'),
    };
  }

  if (!email) {
    return {
      status: 400,
      err: sendError('"email" is required'),
    };
  }

  return null;
};

const verifyPassword = async (req) => {
  const { password } = req.body;

  if (password === '') {
    return {
      status: 400,
      err: sendError('"password" is not allowed to be empty'),
    };
  }

  if (!password) {
    return {
      status: 400,
      err: sendError('"password" is required'),
    };
  }

  return null;
};

const loginValidation = async (req, res, next) => {
  const emailErr = await verifyEmail(req);
  if (emailErr) {
    return res.status(emailErr.status).json(emailErr.err);
  }

  const passErr = await verifyPassword(req);
  if (passErr) {
    return res.status(passErr.status).json(passErr.err);
  }

  next();
};

module.exports = loginValidation;
