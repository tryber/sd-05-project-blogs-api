/* const validateEmail = (email) => {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(String(email).toLowerCase());
}; */

const validateEmail = (email) => {
  const regexEmail = RegExp(/\S+@\S+\.\S+/, 'i');
  return regexEmail.test(email);
};

module.exports = {
  validateEmail,
};
