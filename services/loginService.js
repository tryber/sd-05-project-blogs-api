const { Users } = require('../models');

const loginCheck = async (email, password) => {
  if (password === undefined) {
    return {
      error: true,
      code: 400,
      message: '"password" is required',
    };
  }
  if (email === undefined) {
    return {
      error: true,
      code: 400,
      message: '"email" is required',
    };
  }
  const userInfo = Users.findOne({ where: { email, password } });
  return userInfo;
};

module.exports = {
  loginCheck,
};
