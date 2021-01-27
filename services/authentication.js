const { Users } = require('../models');
const { createToken } = require('../auth/token');

const login = async (email, password) => {
  const result = await Users.findOne({ where: { email, password } });

  if (result) {
    const { password: _, ...userData } = result.dataValues;

    const token = createToken(userData);
    return token;
  }

  return null;
};

module.exports = { login };
