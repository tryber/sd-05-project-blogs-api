// const { Op } = require('sequelize');
const { User } = require('../models');
const { checkName, checkEmail, checkPassword } = require('../utils/validation');

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
const checkData = (email, password) => {
  if (email === '') {
    throw new CodeError('"email" is not allowed to be empty', 'invalid_data');
  }

  if (!email) {
    throw new CodeError('"email" is required', 'invalid_data');
  }

  if (!checkEmail(email)) {
    throw new CodeError('"email" must be a valid email', 'invalid_data');
  }

  if (password === '') {
    throw new CodeError('"password" is not allowed to be empty', 'invalid_data');
  }

  if (!password) {
    throw new CodeError('"password" is required', 'invalid_data');
  }

  if (!checkPassword(password)) {
    throw new CodeError('"password" length must be 6 characters long', 'invalid_data');
  }
};

const create = async ({ displayName, email, password, image }) => {
  checkData(email, password);

  if (!checkName(displayName)) {
    throw new CodeError('"displayName" length must be at least 8 characters long', 'invalid_data');
  }

  const thisEmailAlreadyExists = await User.findOne({ where: { email } });
  if (thisEmailAlreadyExists) {
    throw new CodeError('Usuário já existe', 'invalid_entries');
  }

  return User.create({ displayName, email, password, image });
};

const getAll = async () => User.findAll();

const getById = async ({ id }) => {
  const getUserById = await User.findByPk(id);
  if (!getUserById) {
    throw new CodeError('Usuário não existe', 'invalid_id');
  }
  return getUserById;
};

const removeUser = async ({ id }) => User.destroy({ where: { id } });

const login = async ({ email, password }) => {
  checkData(email, password);
  // const verifyUser = await User.findOne({ where: {
  // [Op.and]: [{ email: email.toLowerCase() }, { password }]}});
  const verifyUser = await User.findOne({ where: { email, password } });
  if (verifyUser) {
    return verifyUser;
  }
  throw new CodeError('Campos inválidos', 'invalid_data');
};

module.exports = { create, getAll, getById, login, removeUser };
