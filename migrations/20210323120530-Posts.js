"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable("Posts", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
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
        type: Sequelize.INTEGER,
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
