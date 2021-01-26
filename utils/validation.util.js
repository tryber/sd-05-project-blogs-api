const Joi = require('@hapi/joi');

const NAME_MIN = 8;
const PASS_MIN = 6;

const REGISTER_SCHEMA = Joi.object({
  displayName: Joi.string().min(NAME_MIN).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(PASS_MIN).required().messages(
    { 'string.min': `"password" length must be ${PASS_MIN} characters long` },
  ),
  image: Joi.string(),
});

const validate = (schema) => (data) => {
  const { error } = schema.validate(data || {});
  if (error) throw new Error(`${error};400`.replace('ValidationError: ', ''));
};

module.exports = {
  REGISTER_SCHEMA,
  validate,
};
