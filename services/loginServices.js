const { Users } = require('../models');

const checkLogin = async (email, password) => {
  if (email === undefined) {
    return {
      error: true,
      code: 400,
      message: '"email" is required',
    };
  }
  if (password === undefined) {
    return {
      error: true,
      code: 400,
      message: '"password" is required',
    };
  }
  const credentials = Users.findOne({ where: { email, password } });
  return credentials;
};

module.exports = {
  checkLogin,
};
