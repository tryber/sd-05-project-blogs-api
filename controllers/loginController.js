const { Router } = require('express');
const loginService = require('../services/loginServices');
const token = require('../token/createToken');
const credentials = require('../middlewares/credentials');

const route = Router();

route.post('/', credentials, async (req, res) => {
  try {
    const { email, password } = req.body;
    const check = await loginService.checkLogin(email, password);
    if (!check) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    if (check.error) {
      return res.status(check.code).json({ message: check.message });
    }
    const { password: _, ...userData } = check;
    const tkn = token(userData);
    return res.status(200).json({ tkn });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = route;
