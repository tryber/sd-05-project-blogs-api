const { Users } = require('../models');

const getUsers = () => {
  const users = Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

module.exports = {
  getUsers,
};
