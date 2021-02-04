'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {

      id:  {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      title:  {
        type: Sequelize.STRING,
        allowNull: false
      },

      content: {
        type: Sequelize.STRING,
        allowNull: false
      },

      published: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
      },

      updated: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
