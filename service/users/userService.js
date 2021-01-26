const Joi = require('joi');
const createToken = require('../../middlewares/createToken');

const validateUser = (displayName, email, password, image) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
    image: Joi.required(),
  });
  return schema.validate({ displayName, email, password, image });
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

  const token = createToken(userData);
  return token;
};

module.exports = {
  createUser,
};
