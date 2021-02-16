const { Users } = require('../models');
const ErrorEnums = require('../enumerators/ErrorsEnums');

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
  if (!email) {
    return res.status(400).send(ErrorEnums.missingEmail);
  }
  if (!pattern.test(email)) {
    return res.status(400).send(ErrorEnums.invalidEmail);
  }
  next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send(ErrorEnums.missingPassword);
  }
  if (password.length < 6) {
    return res.status(400).send(ErrorEnums.invalidPassword);
  }
  Users.findAll({
    where: { email: req.body.email },
  }).then((userData) => {
    if (userData.length) {
      return res.status(409).send(ErrorEnums.userExists);
    }
  });
  next();
};

const checkAll = async (_req, _res, next) => {
  verifyDisplayName();
  verifyEmail();
  verifyPassword();
  next();
};

module.exports = {
  verifyDisplayName, verifyEmail, verifyPassword, checkAll,
};
