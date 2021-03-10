"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
    return usersTable;
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable("Users");
  },
};
