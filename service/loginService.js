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
  const userCheck = await Users.findOne({ where: { [Op.and]: [{ email }, { password }] } });
  if (!userCheck) return { error: true, message: 'Campos inválidos', statusCode: 400 };
  // já tenho as informações no userCheck para gerar o token, então é só retoná-lo
  return userCheck;
};

module.exports = {
  login,
};
