'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       const userTable = await queryInterface.createTable('Users', {
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
           type: Sequelize.INTEGER
         },
         image: {
           allowNull: false,
           type: Sequelize.STRING
         }
       })
    return userTable;
  },

  down: async (queryInterface) => { 
    await queryInterface.dropTable('Users')
  }
};
