'use strict';
// MIGRATIONS CRIA TABELAS E AS COLUNAS
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable = queryInterface.createTable('Users', {
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
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return usersTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users'),
};
