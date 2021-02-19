'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
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
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id'}
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated: Sequelize.DATE,
    }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Post'),
};
