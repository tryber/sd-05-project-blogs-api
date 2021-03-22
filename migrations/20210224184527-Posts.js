'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Posts = queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
      type: Sequelize.DATE,
      allowNull: false,
      }
    })
    return Posts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Post'),
};
