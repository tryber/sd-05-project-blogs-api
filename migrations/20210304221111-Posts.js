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
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      update: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    return Posts;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts'),
};
