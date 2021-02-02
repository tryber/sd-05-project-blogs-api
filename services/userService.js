const { Users } = require('../models');

const getUsers = () => {
  const users = Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  console.log(users);
  return users;
};

module.exports = {
  getUsers,
};
