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
       const postsTable = await queryInterface.createTable('Posts', {
         id: {
           allowNull: false,
           autoIncrement: true,
           primaryKey: true,
           type: Sequelize.INTEGER,
         },
         title: {
           allowNull: false,
           type: Sequelize.INTEGER
         },
         content: {
           allowNull: false,
           type: Sequelize.INTEGER
         },
         user_id: {
           type: Sequelize.INTEGER,
           allowNull: false,
           onUpdate: 'CASCADE',
           onDelete: 'CASCADE',
           references: { model: 'Users', key: 'id' },
          },
          published: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updated: {
            allowNull: false,
            type: Sequelize.DATE
          }
      })
    return userTable, postsTable
  },

  down: async (queryInterface) => { 
    await queryInterface.dropTable('Posts')
    await queryInterface.dropTable('Users')
  }
};
