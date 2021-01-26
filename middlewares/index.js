const { validateName, validateEmail, validateNotExisting, validatePassword } = require('./usersMdw');
const errorMdw = require('./errorMdw');

module.exports = {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  errorMdw,
};
