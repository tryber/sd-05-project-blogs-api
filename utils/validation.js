const Joi = require('@hapi/joi');

const CREATE_USER_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).messages(
    { 'string.min': `"password" length must be ${6} characters long` },
  ).required(),
  displayName: Joi.string().min(8).required(),
  image: Joi.string(),
});

const CREATE_POST_SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).messages(
    { 'string.min': `"password" length must be ${6} characters long` },
  ).required(),
});

const validate = (schema) => (data) => {
  const { error } = schema.validate(data || {});
  if (error) throw new Error(`${error}|400`.replace('ValidationError: ', ''));
};

module.exports = {
  LOGIN_SCHEMA,
  CREATE_POST_SCHEMA,
  CREATE_USER_SCHEMA,
  validate,
};
