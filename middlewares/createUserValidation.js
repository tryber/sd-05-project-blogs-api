const { sendError } = require('../services');
const { Users } = require('../models');

const verifyName = (req) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return {
      status: 400,
      err: sendError('"displayName" length must be at least 8 characters long'),
    };
  }

  return null;
};

const verifyEmail = async (req) => {
  const { email } = req.body;

  if (!email) {
    return { status: 400, err: sendError('"email" is required') };
  }

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) {
    return { status: 400, err: sendError('"email" must be a valid email') };
  }

  const foundRegisteredEmail = await Users.findOne({ where: { email } });
  if (foundRegisteredEmail) {
    return { status: 409, err: sendError('Usuário já existe') };
  }

  return null;
};

const verifyPassword = (req) => {
  const { password } = req.body;

  if (!password) {
    return { status: 400, err: sendError('"password" is required') };
  }

  if (password.length < 6) {
    return { status: 400, err: sendError('"password" length must be 6 characters long') };
  }

  return null;
};

const userValidation = async (req, res, next) => {
  const nameErr = verifyName(req);
  if (nameErr) {
    return res.status(nameErr.status).json(nameErr.err);
  }

  const emailErr = await verifyEmail(req);
  if (emailErr) {
    return res.status(emailErr.status).json(emailErr.err);
  }

  const passErr = verifyPassword(req);
  if (passErr) {
    return res.status(passErr.status).json(passErr.err);
  }

  next();
};

module.exports = userValidation;
