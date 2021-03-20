'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Posts = await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
        foreingKey: true,
        type: Sequelize.INTEGER,
      },
      published: {
        type: Sequelize.Date,
        allowNull: false,
      },
      updated: {
        type: Sequelize.Date,
        allowNull: false,
      },
    })
    return Posts;
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Posts')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
};
