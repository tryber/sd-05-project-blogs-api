'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostsTable = queryInterface.createTable('Posts', {
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
        type: Sequelize.TEXT,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' }
      },
      // references.model says what table our FK is refering to, using its Model name.
      // references.key says what column of the above foreign table is to be used as FK.
      // onUpdate & onDelete set what happens when updating or deleting a user,
      // here, ‘CASCADE’ means all posts related to such user also would be updated or deleted.
      published: {
				allowNull: false,
        type: Sequelize.DATE
      },
      updated: {
				allowNull: false,
        type: Sequelize.DATE
      }
    });

    return PostsTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Posts'),
};
