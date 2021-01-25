"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable("Posts"),
};