const { Users } = require('../models');

const createUser = async (req, _res, next) => {
  const { email, displayName, password, image } = req.body;

  const user = await Users.create({ displayName, email, password, image });
  req.userInfo = user;
  return next();
};

module.exports = createUser;
