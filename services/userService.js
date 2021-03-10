const Joi = require("joi");

const createSchema = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
  });
  return schema.validate(data);
};

const createUser = async (data) => {
  const userData = await createSchema(data);
  const { error } = userData;
  if (error) {
    return error;
  }
  return userData;
};

module.exports = { createUser };
