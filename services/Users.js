const Joi = require('@hapi/joi');
const { User } = require('../models');
const { createToken, checkToken } = require('../auth/jwt.auth');

const CREATE_SCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const treatData = (id, displayName, email, image) => ({
  id,
  displayName,
  email,
  image,
});

const createUser = async (displayName, email, passwordParam, image) => {
  const { error } = CREATE_SCHEMA.validate({
    displayName,
    email,
    password: passwordParam,
    image,
  });
  if (error) {
    throw new Error(error.message);
  }

  const createdUser = await User.create({
    displayName,
    email,
    password: passwordParam,
    image,
  });
  const { dataValues } = createdUser;
  const { password, ...dataValuesTreated } = dataValues;
  return createToken(dataValuesTreated);
};

const findAllUsers = async (token) => {
  checkToken(token);
  const usersList = await User.findAll();
  const userListWithoutPassword = usersList.map(
    ({ id, displayName, email, image }) =>
      treatData(id, displayName, email, image),
  );
  return userListWithoutPassword;
};

const findUserById = async (token, idParam) => {
  checkToken(token);
  const user = await User.findAll({ where: { id: idParam } });
  const userFiltered = user.map(({ id, displayName, email, image }) =>
    treatData(id, displayName, email, image));
  return userFiltered[0];
};

const deleteUser = async (token, id) => {
  checkToken(token);

  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  deleteUser,
};
