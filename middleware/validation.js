const { Users } = require("../models");

const errorMessage = (message) => ({ message });

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const verifyName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res
      .status(400)
      .json(
        errorMessage('"displayName" length must be at least 8 characters long')
      );
  }
  return next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!emailRegex.test(email))
    return res.status(400).json(errorMessage('"email" must be a valid email'));
  if (!email) return res.status(401).json(errorMessage('"email" is required'));
  return next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (password < 6)
    return res
      .status(400)
      .json(errorMessage('"password" length must be 6 characters long'));
  if (!password)
    return res.status(401).json(errorMessage('"password" is required'));
  return next();
};

const checkUserEmail = async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await Users.email;
  if (email === userEmail)
    return res.status(409).json(errorMessage("Usuário já existe"));
  return next();
};

module.exports = { verifyName, verifyEmail, verifyPassword, checkUserEmail };
