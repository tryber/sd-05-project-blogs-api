const Sequelize = require('sequelize');

const sequelize = new Sequelize('blogs_api', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
