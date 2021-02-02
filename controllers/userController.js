const { User } = require('../models');
const createToken = require('../auth/createToken');

const { userService, loginService } = require('../services/index');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    await userService.checkBody(displayName, email, password);
    User.create({ displayName, email, password, image })
      .then((user) => res.status(201).json(user));
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    await loginService.validateLogin(email, password);
    const token = createToken({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const saida = await User.findAll();
    return res.status(200).json(saida);
  } catch (err) {
    return res.status(err.code).json({ message: err.message });
  }
};

module.exports = {
  create,
  login,
  getAllUsers,
};
