const jwt = require('jsonwebtoken');
const JWTConfigs = require('../config/JWTConfigs');
const ErrorsEnum = require('../enumerators/ErrorsEnums');
const { Users } = require('../models');

const validateToken = async (token) => {
  const payload = jwt.verify(token, JWTConfigs.SECRET);
  const { userData: { dataValues } } = payload;
  const user = await Users.findOne({ where: { email: dataValues.email } });
  const { password, ...noPaswd } = user;
  return noPaswd;
};

const tokenIsValid = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    await validateToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ ...ErrorsEnum.invalidToken, error });
  }
};

const tokenNotExists = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '') {
    return res.status(401).send(ErrorsEnum.missingToken);
  }
  next();
};

module.exports = { tokenIsValid, tokenNotExists };
