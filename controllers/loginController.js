const { Router } = require('express');
const services = require('../services/loginService');
const { createWebToken } = require('../auth/createToken');

const login = Router();

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const log = await services.verifyLogin(email, password);
    if (!log) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    if (log.error) {
      return res.status(log.code).json({ message: log.message });
    }
    const token = createWebToken({
      id: log.dataValues.id,
      email: log.dataValues.email,
    });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = login;
