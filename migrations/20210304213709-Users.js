'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Users = await queryInterface.createTable('Users', {
      id: {
      allowNull: false, 
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false, 
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false, 
        type: Sequelize.STRING,
        defaultValue: '',
      },
    })
    return Users;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Users')
};
