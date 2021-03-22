const { User } = require('../models');

const UserValidator = (message, validatorKey) => ({ message, validatorKey });

const RegEx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

const create = async (user) => {
  const { displayName, email, password } = user;
  if (!email) { throw (UserValidator('"email" is required', 'isEmail')); }
  const validEmail = RegEx.test(String(email).toLowerCase());
  if (!validEmail) { throw (UserValidator('"email" must be a valid email', 'failedRegex')); }
  if (!password) { throw (UserValidator('"password" is required', 'is_required')); }
  if (password.length < 6) { throw (UserValidator('"password" length must be 6 characters long', 'is_required')); }
  if (displayName === undefined) { throw (UserValidator('"displayName" must a valid name', 'is_required')); }
  if (displayName.length < 8) {
    throw (UserValidator('"displayName" length must be at least 8 characters long', 'is_required'));
  }
  const userDB = await User.findOne({ where: { email } });
  if (userDB) throw (UserValidator('Usuário já existe', 'emailAlreadyExists'));
  return User.create(user);
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return user;
};

const deleteById = async (id) => {
  const destroy = await User.destroy({
    where: { id },
  });
  return destroy;
};

module.exports = { create, getAll, getById, deleteById };
