const { Users } = require('../models');

const create = async (displayName, email, password, image) => {
  if (!displayName) {
    return {
      error: true,
      code: 400,
      message: '"displayName" is required',
    };
  }
  if (!email) {
    return {
      error: true,
      code: 400,
      message: '"email" is required',
    };
  }
  if (!password) {
    return {
      error: true,
      code: 400,
      message: '"password" is required',
    };
  }
  const newUser = await Users.create({ displayName, email, password, image });
  return newUser;
};

const getAll = async () => {
  const allUsers = await Users.findAll({
    attributes: ['id', 'displayName', 'email', 'image'] });
  return allUsers;
};

const getById = async (id) => {
  const userById = await Users.findOne({ where: { id } });
  if (!userById) {
    return {
      error: true,
      code: 404,
      message: 'Usuário não existe',
    };
  }
  return userById;
};
const deleteMe = async (email) => {
  const delMe = await Users.destroy({ where: { email } });
  return delMe;
};

module.exports = {
  create,
  getAll,
  getById,
  deleteMe,
};
