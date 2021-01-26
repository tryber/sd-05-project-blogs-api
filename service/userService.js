const { Users } = require('../models');

const findAllUsers = () =>
  Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

const findUserById = (id) => Users.findOne({ where: { id } });

const deleteUser = (id) => Users.destroy({ where: { id } });

module.exports = {
  findAllUsers,
  findUserById,
  deleteUser,
};
