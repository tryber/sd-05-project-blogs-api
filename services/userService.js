const { Users } = require('../models');

const getUsers = () => {
  const users = Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const getUserById = (id) => Users.findOne({ where: { id } });

const deleteUser = (id) => Users.destroy({ where: { id } });

module.exports = {
  getUsers,
  deleteUser,
  getUserById,
};
