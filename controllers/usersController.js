const { Router } = require('express');
const service = require('../service/usersService');

const router = Router();
const { createToken } = require('../middlewares/auth');
const confirmaToken = require('../middlewares/confirmaToken');
const { Users } = require('../models');

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
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});
router.get('/', confirmaToken, async (_req, res) => {
  try {
    const findUsers = await Users.findAll({ attributes: { exclude: ['password'] } });
    console.log('findUsers==>', findUsers);
    return res.status(200).json(findUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.get('/:id', confirmaToken, async (req, res) => {
  try {
    const { id } = req.params;
    const findUserId = await Users.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!findUserId) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    res.status(200).json(findUserId);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

router.delete('/me', confirmaToken, async (req, res) => {
  try {
    const { id } = req.payload;
    const deletaUser = await Users.destroy({ where: { id } });
    res.status(204).json(deletaUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
