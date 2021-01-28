"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        unique: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now,
      }
    });

    return UsersTable;

  },

  down: async (queryInterface) => queryInterface.dropTable("Users"),
};