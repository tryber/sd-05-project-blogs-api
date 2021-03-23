"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      published: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return PostsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable("Posts"),
};
