const { Users } = require('../models');

const findEmail = (email) => Users
  .findOne({ where: { email } })
  .then(true)
  .catch((e) => console.error(e.message));

module.exports = findEmail;
