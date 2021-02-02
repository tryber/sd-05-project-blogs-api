const { Users } = require('../models');

const getUsers = () => {
  const users = Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const getUserById = (id) => {
  const user = Users.findOne({ where: { id } });

  return user;
};

module.exports = {
  getUsers,
  getUserById,
};
