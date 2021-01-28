const { Users } = require('../models');

const emailValidation = async (req) => {
  const { email } = req.body;

  if (!email) return { err: { message: '"email" is required', status: 400 } };

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) return { err: { message: '"email" must be a valid email', status: 400 } };

  const alreadyExistEmail = await Users.findOne({ where: { email } });

  if (alreadyExistEmail) return { err: { message: 'Usuário já existe', status: 409 } };

  return null;
};

module.exports = emailValidation;
