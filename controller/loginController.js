const { Router } = require('express');

const service = require('../service/loginService');

const logins = Router();

const { createToken } = require('../Middlewares/webTokenCreate');

logins.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    // const findUser = await MODEL.filter((user) => user.email == email);
    const login = await service.login(email, password);
    if (login.error) {
      return res.status(login.statusCode).json({ message: login.message });
    }
    const token = createToken({
      id: login.id,
      email,
      iss: 'post_api',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = logins;
