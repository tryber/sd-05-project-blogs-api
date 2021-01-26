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
        type: Sequelize.STRING,
        unique: true,
				allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
        allowNull: false,
      },
      published: {
        type: Sequelize.STRING,
        allowNull: false
      },
      updated: {
        type: Sequelize.STRING,
        allowNull: false
      }
		});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
	}
};
