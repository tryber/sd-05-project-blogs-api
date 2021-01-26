const Users = require('../models');
const { createToken } = require('../middlewares/JWToken');

const create = async (body) => {
  // if (!body) {
  //   return {
  //     error: true,
  //     code: 'Bad Request',
  //     message: 'Invalid entries. Try again.',
  //   };
  // }
  const { displayName, email, password, image } = body;

  if (!/^[A-Za-z \s]{8,}$/.test(displayName) || !displayName) {
    return {
      error: true,
      code: 'Bad Request',
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  if (!email) {
    return {
      error: true,
      code: 'Bad Request',
      message: '"email" is required',
    };
  }
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i;
  const emailIsValid = emailRegex.test(email);
  if (!emailIsValid) {
    return {
      error: true,
      code: 'Bad Request',
      message: '"email" must be a valid email',
    };
  }
  if (!password) {
    return {
      error: true,
      code: 'Bad Request',
      message: '"password" is required',
    };
  }
  if (password.length < 6) {
    return {
      error: true,
      code: 'Bad Request',
      message: '"password" length must be 6 characters long',
    };
  }  
  // console.log(email);
  const emailExists = await Users.findOne({ where: { email } });
  // console.log(emailExists);
  if (emailExists) {
    return {
      error: true,
      code: 'Conflict',
      message: 'Usuário já existe',
    };
  }
  const newUser = await Users.create(displayName, email, password, image);
  // console.log(newUser);
  console.log('User Token', {
    id: newUser.insertId,
    displayName,
    email,
  });
  const token = createToken({
    id: newUser.insertId,
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
