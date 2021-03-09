const { Users } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const newUser = await Users.create({ displayName, email, password, image});
  return newUser;
}

module.exports = { createUser };
