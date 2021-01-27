const nameLength = 8;
const passwordLength = 6;

const checkName = (name) => !(name.length < nameLength);

const checkEmail = (email) => email.match(/\S+@\S+\.\S+/);

const checkPassword = (password) => !(password.length < passwordLength);

module.exports = { checkName, checkEmail, checkPassword };
