const { Users } = require('../models');

module.exports = {
  createUser: async (displayName, email, password, image) =>
    Users.create({
      displayName,
      email,
      password,
      image,
    }).then((userData) => userData),

  getUsers: async () => Users.findAll().then((userData) => userData),
  getUserById: async (id) => Users.findOne({ where: { id } })
    .then((userData) => userData),
  removeMe: async (email) => Users.destroy({ where: { email } }),

};
