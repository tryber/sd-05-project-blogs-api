const { Router } = require('express');

const router = Router();
const service = require('../services/loginService');
/* const { User } = require('../models'); */
const createJWT = require('../middlewares/createTokenJWT');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await service.find(email, password);
    if (userLogin.error) {
      return res.status(userLogin.statusCode).json({ message: userLogin.message });
    }
    const tokenOn = createJWT(userLogin);
    return res.status(200).json({ token: tokenOn });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
