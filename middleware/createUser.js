const { Users } = require('../models');

const createUser = async (req, _res, next) => {
  const { email, displayName, password, image = null } = req.body;

  const user = await Users.create({ displayName, email, password, image });
  req.userInfo = user;
  next();
};

module.exports = createUser;
