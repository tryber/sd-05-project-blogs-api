const { Users } = require('../models');

module.exports = {
  createUser: async (displayName, email, password, image) =>
    Users.create({
      displayName,
      email,
      password,
      image,
    }).then((userData) => userData), // return newUser;

  getUsers: async () => Users.findAll().then((userData) => userData),
  getUserById: async (id) => Users.findOne({ where: { id } })
    .then((userData) => {
      console.log(userData);
      return userData;
    }),
};
