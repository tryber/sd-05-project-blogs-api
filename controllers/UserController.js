const { Router } = require('express');

const router = Router();
const service = require('../services/userService');
const { User } = require('../models');
const createJWT = require('../middlewares/createTokenJWT');
const autJWT = require('../middlewares/autTokenJWT');

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userCreate = await service.create(displayName, email, password, image);
    if (userCreate.error) {
      return res.status(userCreate.statusCode).json({ message: userCreate.message });
    }
    const tokenOn = createJWT(userCreate);
    return res.status(201).json({ token: tokenOn });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.get('/', autJWT, (_req, res) => {
  User.findAll()
    .then((Users) => res.status(200).json(Users))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ message: 'Erro' });
    });
});

router.get('/:id', autJWT, async (req, res) => {
  await User.findByPk(req.params.id)
    .then((Users) => {
      if (Users === null) {
        return res.status(404).send({ message: 'Usuário não existe' });
      }
      return res.status(200).json(Users);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.delete('/me', autJWT, (req, res) => {
  const { id } = req.payload.useData.dataValues;
  User.destroy({ where: { id } })
    .then(() => res.status(204).send({ message: 'Usuario excluído com sucesso.' }))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;
