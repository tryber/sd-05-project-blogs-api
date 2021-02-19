const jwt = require('jsonwebtoken');

const jwtConfigs = require('../config/JWTConfigs');

const ErrorsEnums = require('../enumerators/ErrorsEnums');

const { Users } = require('../models');

const loginUser = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } }).then((userValues) => userValues);
    if (password !== user.password) {
      return res.status(401).json(ErrorsEnums.invalidFields);
    }
    const { password: _pswd, ...noPasswd } = user;
    const payload = {
      ...jwtConfigs.Payload,
      userData: noPasswd,
    };
    const token = jwt.sign(payload, jwtConfigs.SECRET, jwtConfigs.jwtConf);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Deu ruim', err });
  }
};

module.exports = { loginUser };
