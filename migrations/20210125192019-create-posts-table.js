'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' }
			},
			published: {
				type: Sequelize.DATE,
				allowNull: false
      },
      updated: {
				type: Sequelize.DATE,
				allowNull: false
			}
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
