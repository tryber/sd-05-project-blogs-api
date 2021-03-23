const { Op } = require('sequelize');

const { Users } = require('../models');

const login = async (email, password) => {
  if (email === undefined) {
    return {
      error: true,
      message: '"email" is required',
      statusCode: 400,
    };
  }
  if (password === undefined) {
    return {
      error: true,
      message: '"password" is required',
      statusCode: 400,
    };
  }
  if (!email) return { error: true, message: '"email" is not allowed to be empty', statusCode: 400 };
  if (!password) return { error: true, message: '"password" is not allowed to be empty', statusCode: 400 };
  const checkUser = await Users.findOne({ where: { [Op.and]: [{ email }, { password }] } });
  if (!checkUser) return { error: true, message: 'Campos inválidos', statusCode: 400 };
  return checkUser;
};
module.exports = {
  login,
};
