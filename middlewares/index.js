const {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
} = require('./usersMdw');
const { validateLoginEmail, validateExistingEmail, validateLoginPassword } = require('./loginMdw');

const errorMdw = require('./errorMdw');

module.exports = {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  validateLoginEmail,
  validateExistingEmail,
  validateLoginPassword,
  errorMdw,
};
