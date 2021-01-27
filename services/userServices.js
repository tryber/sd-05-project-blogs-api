const { Users } = require('../models');

const create = async (displayName, email, password, image) => {
  if (!displayName) {
    return {
      error: true,
      code: 400,
      message: '"displayName" is required',
    };
  }
  if (!email) {
    return {
      error: true,
      code: 400,
      message: '"email" is required',
    };
  }
  if (!password) {
    return {
      error: true,
      code: 400,
      message: '"password" is required',
    };
  }
  const newUser = await Users.create({ displayName, email, password, image });
  return newUser;
};

module.exports = {
  create,
};
