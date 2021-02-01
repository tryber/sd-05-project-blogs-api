const { Op } = require('sequelize');
const { User } = require('../models');

const CodeError = require('../errorClass/errorClass');

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkDisplayName = (displayName) => {
  if (displayName.length > 7) return true;

  throw new CodeError(400, '"displayName" length must be at least 8 characters long');
};

const checkEmail = async (email) => {
  if (!email) throw new CodeError(400, '"email" is required');

  if (!validateEmail(email)) throw new CodeError(400, '"email" must be a valid email');

  const emailExists = await User.findAll({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (emailExists.length !== 0) throw new CodeError(409, 'Usuário já existe');

  return true;
};

const checkPassword = (password) => {
  if (!password) throw new CodeError(400, '"password" is required');
  if (password.length !== 6) throw new CodeError(400, '"password" length must be 6 characters long');

  return true;
};

const checkBody = async (displayName, email, password) => {
  if (checkDisplayName(displayName) && await checkEmail(email) && checkPassword(password)) {
    return true;
  }

  return false;
};

module.exports = {
  checkBody,
};

//  https://sequelize.org/master/manual/model-querying-basics.html
