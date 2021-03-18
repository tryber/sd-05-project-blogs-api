"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsTable = queryInterface.createTable("Posts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: { model: "Users", key: "id" },
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
    return postsTable;
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable("Posts");
  },
};
