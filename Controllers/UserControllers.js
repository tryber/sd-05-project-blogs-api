const rescue = require('express-rescue');
const { createToken } = require('../Middleware/jwtAuth');
const { User } = require('../models');
const userService = require('../Service/UserServices');

const createUser = rescue(async (req, res) => {
  const { body } = req;
  const createdUser = await User.create(body);
  const { password: _, ...userWithoutPassword } = createdUser;

  const token = createToken(userWithoutPassword);
  return res.status(201).json({ token });
});

const login = rescue(async (req, res, next) => {
  try {
    const emailAndPassword = req.body;

    const token = await userService.login(emailAndPassword, next);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    const { message, status } = error;
    console.log('====================================');
    console.log(message);
    console.log(status);
    console.log('====================================');
    next({ message, status });
  }
});
module.exports = { createUser, login };
