const { createToken } = require('../functions/tokenOp');

const { Users } = require('../models');

const criaError = (message, status) => ({
  isError: false,
  message,
  status,
});

async function checkEmailPassDB(password, email) {
  const err = criaError('Campos inválidos', 400);
  const usedEmail = await Users.findOne({ where: { email } });
  if (!usedEmail) { return { ...err, isError: true }; }
  const dataValues = { ...usedEmail.dataValues };
  err.status = 409;
  err.message = 'Problema ao entrar. Senha e/ou Login não estão corretas';
  if (!usedEmail.password === password) { return { ...err, isError: true }; }
  delete usedEmail.dataValues.password;
  const token = createToken(dataValues);
  return { isError: false, token };
}

module.exports = { checkEmailPassDB };
