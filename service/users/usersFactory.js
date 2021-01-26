const userService = require('./userService');
const { User } = require('../../models/');

const userFactory = () => {
  return {
    createUser: userService.createUser(User),
  };
};

module.exports = userFactory;
