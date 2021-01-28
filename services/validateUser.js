const { Users } = require('../models');

function validateName(name) {
  if (!name) return { error: true, code: 400, message: '"displayName" is required' };

  if (name && name.length < 8) {
    return {
      error: true,
      code: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return null;
}

function validateEmail(email) {
  if (!email || email === undefined) {
    return { error: true, code: 400, message: '"email" is required' };
  }

  const RegEx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const validEmail = RegEx.test(String(email).toLowerCase());

  if (email && !validEmail) return { error: true, code: 400, message: '"email" must be a valid email' };

  return null;
}

function validatePassword(password) {
  if (!password) return { error: true, code: 400, message: '"password" is required' };

  if (password && password.length < 6) {
    return {
      error: true,
      code: 400,
      message: '"password" length must be 6 characters long',
    };
  }

  return null;
}

async function validateExistence(email) {
  const user = await Users.findOne({ where: { email } });

  if (user !== null) return { error: true, code: 409, message: 'Usuário já existe' };

  return null;
}

async function validateUser(name, email, password) {
  const validName = validateName(name);
  if (validName !== null) return validName;

  const validEmail = validateEmail(email);
  if (validEmail !== null) return validEmail;

  const validPassword = validatePassword(password);
  if (validPassword !== null) return validPassword;

  const userExists = await validateExistence(email);
  if (userExists !== null) return userExists;

  return true;
}

module.exports = validateUser;
