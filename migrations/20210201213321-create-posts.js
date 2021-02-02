'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      published: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updated: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      // userId: {
      //   allowNull: false,
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   references: {
      //     model: 'Users',
      //     key: 'id'
      //   },
      //   type: Sequelize.INTEGER
      // }
    });

    return PostsTable;
  },

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('Posts')
};
