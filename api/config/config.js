// require('dotenv').config({
//   path: (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development")
//   ? ".env" : ".env"
// })
module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.API_NAME,
    host: process.env.HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.API_NAME,
    host: process.env.HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.API_NAME,
    host: process.env.HOSTNAME,
    dialect: process.env.DB_DIALECT,
  },
};
