const { Users } = require('../models');

async function createUser(displayName, email, password, image) {
  return Users.create({ displayName, email, password, image });
}

async function getAllUsers() {
  const users = await Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

  console.log(users);
  return users;
}

async function getUserById(id) {
  const userID = await Users.findOne({ where: { id } });

  if (!userID) {
    return {
      error: true,
      code: 404,
      message: 'Usuário não existe',
    };
  }

  return userID;
}

module.exports = { createUser, getAllUsers, getUserById };
