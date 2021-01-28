const { Users } = require('../models');

async function userLogin(email, password) {
  if (email === undefined) {
    return { error: true, code: 400, message: '"email" is required' };
  }

  if (email !== undefined && email.length === 0) {
    return { error: true, code: 400, message: '"email" is not allowed to be empty' };
  }

  if (password === undefined) {
    return { error: true, code: 400, message: '"password" is required' };
  }

  if (password !== undefined && password.length < 1) {
    return { error: true, code: 400, message: '"password" is not allowed to be empty' };
  }

  return Users.findOne({
    where: { email, password },
    attributes: ['id', 'email', 'displayName'],
  });
}

module.exports = { userLogin };
