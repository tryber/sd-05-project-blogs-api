const { User } = require('../models');

const getUser = async () => {
  const allUser = await User.findAll();
  return allUser;
};

module.exports = getUser;
