'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Posts',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        published: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      { timestamps: false },
    );
  },
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Posts'),
};
