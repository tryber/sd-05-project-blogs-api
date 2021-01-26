const userService = require('./userService');
const { User } = require('../../models');

const userFactory = () => ({
  createUser: userService.createUser(User),
  logUser: userService.logUser(User),
  listAllUsers: userService.listAllUsers(User),
  getUserById: userService.getUserById(User),
});

module.exports = userFactory;
