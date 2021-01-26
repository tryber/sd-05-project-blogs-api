const userService = require('./userService');
const { User } = require('../../models');

const userFactory = () => ({
  createUser: userService.createUser(User),
  logUser: userService.logUser(User),
});

module.exports = userFactory;
