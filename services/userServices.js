const { Users } = require('../models');

async function createUser(displayName, email, password, image) {
  const newUser = await Users.create({ displayName, email, password, image });

  return newUser;
}

module.exports = { createUser };
