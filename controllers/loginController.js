const { Router } = require('express');

const service = require('../service/loginServices');

const router = Router();

const { createToken } = require('../middlewares/auth');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await service.login(email, password);
    if (login.error) {
      return res.status(login.statusCode).json({ message: login.message });
    }
    const token = createToken({
      email,
      iss: 'post_api',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Algo está errado' });
  }
});

module.exports = router;
