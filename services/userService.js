const { User } = require('../models');

function UserValidator(message, validatorKey) {
  return {
    message,
    validatorKey
  };
}


const create = async (user) => {
  const { displayName, email, password } = user;
  
  if (!email) {
    throw (UserValidator("\"email\" is required", 'isEmail'));
  }

  const RegEx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const validEmail = RegEx.test(String(email).toLowerCase());

  if (!validEmail) throw (UserValidator('"email" must be a valid email', 'failedRegex'));

  if (!password) {
    throw (UserValidator(
      '"password" is required', 'is_required'));
  }
  if (password.length < 6) {
    throw (UserValidator('"password" length must be 6 characters long', 'is_required'));
  }
  if (displayName === undefined) {
    throw (UserValidator("'displayName' must a valid name", 'is_required'));
  }
  if (displayName.length < 8) {
    throw (UserValidator('"displayName" length must be at least 8 characters long', 'is_required')
    )
  }
  const userDB = await User.findOne({ where: { email } });
  console.log("L37", userDB)
  if (userDB) {
    throw (UserValidator('Usuário já existe', 'emailAlreadyExists'));
  }
  return User.create(user);
};

module.exports = {
  create,
};
