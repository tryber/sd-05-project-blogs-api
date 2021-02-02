const Joi = require('joi');
const createToken = require('../../middlewares/createToken');
const decodeToken = require('../../middlewares/decodeToken');

const validateUser = (displayName, email, password, image) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.required(),
  });
  return schema.validate({ displayName, email, password, image });
};

const validateLogin = (email, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required().not()
      .empty(),
    password: Joi.string().required().not().empty(),
  });
  return schema.validate({ email, password });
};

const createUser = (User) => async (displayName, email, password, image) => {
  const userValidation = validateUser(displayName, email, password, image);
  if (userValidation.error) {
    return {
      error: true,
      message: userValidation.error.message,
      statusCode: 400,
    };
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return {
      error: true,
      message: 'Usuário já existe',
      statusCode: 409,
    };
  }

  const {
    dataValues: { password: _, ...userData },
  } = await User.create({ displayName, email, password, image });

  return createToken(userData);
};

const logUser = (User) => async (email, password) => {
  const loginValidation = validateLogin(email, password);
  if (loginValidation.error) {
    return {
      error: true,
      message: loginValidation.error.message,
      statusCode: 400,
    };
  }

  const isUserValid = await User.findOne({ where: { email, password } });
  if (!isUserValid) {
    return {
      error: true,
      message: 'Campos inválidos',
      statusCode: 400,
    };
  }

  const {
    dataValues: { password: _, ...userData },
  } = isUserValid;

  return createToken(userData);
};

const listAllUsers = (User) => async () => {
  // { attributes: { exclude: ['password'] } }
  const getAllUsers = await User.findAll();
  const everyUser = getAllUsers.map((user) => {
    const {
      dataValues: { password: _, ...userData },
    } = user;
    return userData;
  });
  return everyUser;
};

const getUserById = (User) => async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return {
      error: true,
      message: 'Usuário não existe',
      statusCode: 404,
    };
  }
  const {
    dataValues: { password: _, ...userData },
  } = user;
  return userData;
};

const deleteUser = (User) => async (token) => {
  const { id } = decodeToken(token);
  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  logUser,
  listAllUsers,
  getUserById,
  deleteUser,
};
