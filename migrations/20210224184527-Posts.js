'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Posts = queryInterface.createTable('Posts', {
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
        type: Sequelize.STRING,
      },
      updated: Sequelize.DATE,
    })
    return Posts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Post'),
};
