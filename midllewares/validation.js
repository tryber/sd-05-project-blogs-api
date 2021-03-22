const { User } = require('../models');

const emailValido = (email) => {
  const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexMail.test(String(email).toLowerCase());
};

function verifyEmail(email) {
  const err = {}
  if (email === "") {
    err.message = '"email" is not allowed to be empty';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  if (!email) {
    err.message = '"email" is required';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  if (!emailValido(email)) {
    err.message = '"email" must be a valid email';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyName(displayName) {
  const err = {}
  if (displayName.length < 8) {
    err.message = '"displayName" length must be at least 8 characters long';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

function verifyPassword(password) {
  const err = {}
  if (password === "") {
    err.message = '"password" is not allowed to be empty';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  if (!password) {
    err.message = '"password" is required';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  if (password.length < 6) {
    err.message = '"password" length must be 6 characters long';
    err.status = 400;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

async function verifyEmailExist(email) {
  const user = await User.findOne({ where: {email} });
  const err = {}
  if (user != undefined) {
    err.message = 'Usuário já existe';
    err.status = 409;
    err.code = 'invalid_data';
    throw err;
  }
  return err;
}

module.exports = { verifyName, verifyEmail, verifyPassword, verifyEmailExist };
