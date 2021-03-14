const { Router } = require('express');
const service = require('../service/usersService');

const router = Router();
const { createToken } = require('../middlewares/auth');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userCreate = await service.create(
      displayName,
      email,
      password,
      image,
    );
    if (userCreate.error) {
      return res
        .status(userCreate.statusCode)
        .json({ message: userCreate.message });
    }
    const token = createToken({
      displayName,
      id: userCreate.id,
      iss: 'post_api',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Algo está errado' });
  }
});

module.exports = router;
