const { Users } = require('../models');
const validateUser = require('./validateUser');

async function createUser(displayName, email, password, image) {
  const validUser = await validateUser(displayName, email, password);

  if (validUser === true) {
    const newUser = await Users.create({ displayName, email, password, image });

    return newUser;
  }

  return validUser;
}

async function getAllUsers() {
  const users = await Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });

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

async function deleteUser(email) {
  const seekAndDestroy = await Users.destroy({ where: { email } });

  return seekAndDestroy;
}

module.exports = { createUser, getAllUsers, getUserById, deleteUser };
