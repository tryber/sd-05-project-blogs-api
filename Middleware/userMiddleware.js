const joi = require('@hapi/joi');
const rescue = require('express-rescue');

const USER_SCHEMA = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string().required(),
});

const validateUserEntries = async (req, res, next) => {
  // try {
    const { error } = USER_SCHEMA.validate(req.body);

    if (error) next({ error, status: 400 });

  // } catch (error) {
  //   return res.status(400).json(error);
  // }
};

module.exports = { validateUserEntries };
