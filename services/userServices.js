const { Users } = require('../models');
const { createToken } = require('../middlewares/JWToken');

const returnMsg = (errorMessage) => {
  return {
    error: true,
    code: 'Bad Request',
    message: errorMessage,
  }
};

const create = async (body) => {
  const { displayName, email, password, image } = body;
  if (!/^[A-Za-z \s]{8,}$/.test(displayName) || !displayName) {
    return returnMsg('"displayName" length must be at least 8 characters long')
  };
  if (!email) { return returnMsg('"email" is required')};
  if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i.test(email)) {
    return returnMsg('"email" must be a valid email')
    };
  if (!password) { returnMsg('"password" is required') };
  if (password.length < 6) { returnMsg('"password" length must be 6 characters long') };
  const emailExists = await Users.findOne({ where: { email } });
  if (emailExists) {
    return {
      error: true,
      code: 'Conflict',
      message: 'Usuário já existe',
    };
  }
  const newUser = await Users.create({ displayName, email, password, image });
  const token = createToken({
    displayName,
    email,
  });
  return token;
};

module.exports = {
  // login,
  // getAll,
  // getById,
  create,
  // update,
  // exclude,
};
