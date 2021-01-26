// const checkEmail = require('../Middlewares/checkEmail');

// const { Users } = require('../models');

const login = (email, password) => {
  // const validaEmail = checkEmail.validateEmail(email);
  if (!email) return { error: true, message: '"email" is required', statusCode: 400 };
  if (!password) return { error: true, message: '"password" is required', statusCode: 400 };
  if (email === null) {
    return {
      error: true,
      message: '"email" is not allowed to be empty',
      statusCode: 400,
    };
  }
  if (password === null) {
    return {
      error: true,
      message: '"password" is not allowed to be empty',
      statusCode: 400,
    };
  }

  // return Users.create({ email, password });
};

module.exports = {
  login,
};
