const jwt = require('jsonwebtoken');

const ErrorsEnums = require('../enumerators/ErrorsEnums');

const { Users } = require('../models');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = 'GROGU';

const loginUser = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } }).then((userValues) => userValues);
    if (password !== user.password) {
      return res.status(401).json(ErrorsEnums.invalidFields);
    }
    const { password: pswd, ...noPasswd } = user;
    const payload = {
      iss: 'blogs-api',
      aud: 'identity',
      userData: noPasswd,
    };
    const token = jwt.sign(payload, SECRET, jwtConfig);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Deu ruim', err });
  }
};

module.exports = { loginUser };
