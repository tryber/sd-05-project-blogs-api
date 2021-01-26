'use strict';

// // Migration to create the posts table
// Deve conter uma tabela chamada Posts, contendo os seguinte dados:
// {
//   "id": "7706273476706534553",
//   "title": "Latest updates, August 1st",
//   "content": "The whole text for the blog post goes here in this key",
//   "userId": "401465483996", // esse é o id que referência usuário que é o autor do post
//   "published": "2011-08-01T19:58:00.000Z",
//   "updated": "2011-08-01T19:58:51.947Z",
// }

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
