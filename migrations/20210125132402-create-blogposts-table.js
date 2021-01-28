"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostTable = queryInterface.createTable("Posts", {
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
        unique: true,
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now,
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      //   references: { model: 'Users', key: 'id' },
      // },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.Now,
      }
    });

    return PostTable;

  },

  down: async (queryInterface) => queryInterface.dropTable("Posts"),
};