require('dotenv').config();

console.log(`testando config.js: ${process.env.NODE_ENV}`);

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOSTNAME,
    dialect: process.env.DIALECT,
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOSTNAME,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'blogs_api',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};
