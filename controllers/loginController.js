const { Router } = require('express');
const service = require('../services/loginService');
const createJWT = require('../auth/createJWT');
const loginInfo = require('../middleware/loginInfo');

const login = Router();

login.post('/', loginInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginC = await service.loginCheck(email, password);
    if (!loginC) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    if (loginC.error) {
      return res.status(loginC.code).json({ message: loginC.message });
    }
    const token = createJWT(loginC.dataValues);
    return res.status(200).json({ token });
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = login;
