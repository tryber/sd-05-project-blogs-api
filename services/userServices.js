const { Users } = require('../models');

async function createUser(displayName, email, password, image) {
  return Users.create({ displayName, email, password, image });
}

async function getAllUsers() {
  const users = await Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

  console.log(users);
  return users;
}

module.exports = { createUser, getAllUsers };
