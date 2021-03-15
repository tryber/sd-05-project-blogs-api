const { User } = require('../models');

async function isEmail(email) {
  const err = { isError: false };
  const usedEmail = await User.findOne({ where: { email } });
  if (usedEmail) err.isError = true;
  return err;
}

module.exports = isEmail;
