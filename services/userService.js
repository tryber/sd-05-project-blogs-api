const { Users } = require('../models');

async function existEmail(email) {
  const err = { isError: false, message: 'Usuário já existe', status: 409 };
  const usedEmail = await Users.findOne({ where: { email } });
  if (usedEmail) err.isError = true;
  return err;
}

module.exports = { existEmail };
