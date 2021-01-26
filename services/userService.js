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

module.exports = {
  create,
};
