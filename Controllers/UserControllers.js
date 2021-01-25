const rescue = require('express-rescue');
const { createToken } = require('../Middleware/jwtAuth');
const { User } = require('../models');

const createUser = rescue(async (req, res) => {
  const { body } = req;
  const createdUser = await User.create(body);
  const { password: _, ...userWithoutPassword } = createdUser;

  const token = createToken(userWithoutPassword);
  return res.status(201).json({ token });
});

module.exports = { createUser };
