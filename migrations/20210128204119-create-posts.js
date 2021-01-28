'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Posts = await queryInterface.createTable('Posts', {
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
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      published: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.NOW
      },
      updated: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: Sequelize.NOW
      },

    });
    return Posts;
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Posts')
};
