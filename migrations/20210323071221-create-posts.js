'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsTable = queryInterface.createTable('Posts', {
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
      published: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      }
    });
    return postsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};