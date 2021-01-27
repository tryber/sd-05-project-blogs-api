const Joi = require('@hapi/joi');

const NAME_MIN = 8;
const PASS_MIN = 6;

const USER_BASE = {
  email: Joi.string().email().required(),
  password: Joi.string().min(PASS_MIN).messages(
    { 'string.min': `"password" length must be ${PASS_MIN} characters long` },
  ).required(),
};

const LOGIN_SCHEMA = Joi.object(USER_BASE);

const REGISTER_SCHEMA = Joi.object({
  ...USER_BASE,
  displayName: Joi.string().min(NAME_MIN).required(),
  image: Joi.string(),
});

const validate = (schema) => (data) => {
  const { error } = schema.validate(data || {});
  if (error) throw new Error(`${error};400`.replace('ValidationError: ', ''));
};

module.exports = {
  REGISTER_SCHEMA,
  LOGIN_SCHEMA,
  validate,
};
