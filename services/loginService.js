const { Op } = require('sequelize');
const { User } = require('../models');

const CodeError = require('../errorClass/errorClass');

const checkEmail = (email) => {
  if (email === undefined) throw new CodeError(400, '"email" is required');

  if (email === '') throw new CodeError(400, '"email" is not allowed to be empty');
};

const checkPassword = (password) => {
  if (password === undefined) throw new CodeError(400, '"password" is required');
  if (password === '') throw new CodeError(400, '"password" is not allowed to be empty');
};

const validateLogin = async (email, password) => {
  checkEmail(email);
  checkPassword(password);
  const userInDatabase = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (!userInDatabase || userInDatabase.password !== password) throw new CodeError(400, 'Campos inválidos');
  return userInDatabase.id;
};

module.exports = {
  validateLogin,
};
