'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        min: 8,
        max: 64,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        min: 8,
        max: 64,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        min: 8,
        max: 64,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
        type: Sequelize.INTEGER,
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
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
