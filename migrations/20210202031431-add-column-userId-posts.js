'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('Posts', 'userId', {
    allowNull: false,
    defaultValue: -1,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'Users',
      key: 'id'
    },
    type: Sequelize.INTEGER
  }),

  down: async (queryInterface, _Sequelize) => queryInterface.removeColumn('Posts', 'userId'),
};
