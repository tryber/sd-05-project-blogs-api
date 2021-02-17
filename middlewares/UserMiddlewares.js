const { cp } = require('shelljs');
const { Users } = require('../models');
const ErrorEnums = require('../enumerators/ErrorsEnums');
const UserServices = require('../services/User.services');

const pattern = new RegExp(/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/, 'i');

const verifyDisplayName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).send(ErrorEnums.invalidDisplayName);
  }
  next();
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).send(ErrorEnums.missingEmail);
  }
  if (email === '') {
    return res.status(400).send(ErrorEnums.emptyEmail);
  }
  if (!pattern.test(email)) {
    return res.status(400).send(ErrorEnums.invalidEmail);
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).send(ErrorEnums.missingPassword);
  }
  if (password === '') {
    return res.status(400).send(ErrorEnums.emptyPassword);
  }
  if (password.length < 6) {
    return res.status(400).send(ErrorEnums.invalidPassword);
  }
  next();
};

const verifyUserExists = async (req, res, next) => {
  const { email } = req.body;
  await Users.findAll({
    where: { email },
  }).then((userData) => {
    if (userData.length) {
      return res.status(409).send(ErrorEnums.userExists);
    }
  });
  next();
};

const verifyUserNotExists = async (req, res, next) => {
  const { email } = req.body;
  await Users.findAll({
    where: { email },
  }).then((userData) => {
    if (userData.length === 0) {
      return res.status(400).send(ErrorEnums.invalidFields);
    }
  });
  next();
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExists,
  verifyUserNotExists,
};
