const checkEmail = require('../middlewares/emailValidation');

const { Users } = require('../models');

const create = async (displayName, email, password, image) => {
  const validoEmail = checkEmail.validaEmail(email);
  if (displayName.length < 8) {
    return {
      error: true,
      message: '"displayName" length must be at least 8 characters long',
      statusCode: 400,
    };
  }
  if (!email) return { error: true, message: '"email" is required', statusCode: 400 };
  if (!password) return { error: true, message: '"password" is required', statusCode: 400 };
  if (!validoEmail) {
    return { error: true, message: '"email" must be a valid email', statusCode: 400 };
  }
  if (password.length < 6) {
    return { error: true, message: '"password" length must be 6 characters long', statusCode: 400 };
  }
  const doubleEmail = await Users.findOne({ where: { email } });
  console.log('emailduplicate', doubleEmail);
  if (doubleEmail) {
    return { error: true, message: 'Usuário já existe', statusCode: 409 };
  }
  return Users.create({ displayName, email, password, image });
};

module.exports = {
  create,
};
