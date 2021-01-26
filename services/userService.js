const { User } = require('../models');

function UserException(message, validatorKey) {
  this.message = message;
  this.validatorKey = validatorKey;

  return {
    errors: [{
      message,
      validatorKey,
    }],
  };
}

const create = async (user) => {
  const { email, password } = user;
  if (!email) {
    throw new UserException('"email" is required', 'is_required');
  }
  if (!password) {
    throw new UserException('"password" is required', 'is_required');
  }
  return User.create(user);
};

const getAll = async () => User.findAll();

const getOne = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new UserException('Usuário não existe', 'not_found');
  const { id, displayName, email, image } = user.dataValues;
  return { id, displayName, email, image };
};

module.exports = {
  create,
  getAll,
  getOne,
};
