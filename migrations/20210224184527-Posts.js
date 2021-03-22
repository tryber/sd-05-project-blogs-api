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
        defaultValue: -1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id'}
      },
      published: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: new Date(),
      },
      updated: {
      type: Sequelize.STRING,
      defaultValue: new Date()
      }
    })
    return Posts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Post'),
};
