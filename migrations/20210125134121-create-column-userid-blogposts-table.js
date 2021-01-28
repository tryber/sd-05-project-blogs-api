
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Posts', 'userId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			// defaultValue: 1,
			references: {
				model: 'Users',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Posts', 'userId');
	}
};