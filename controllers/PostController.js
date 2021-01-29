const { Router } = require('express');

const router = Router();
const service = require('../services/postService');
/* const { Post } = require('../models'); */
const autJWT = require('../middlewares/autTokenJWT');

router.post('/', autJWT, async (req, res) => {
  try {
    const { id: userId } = req.payload.useData.dataValues;
    const { title, content } = req.body;
    const postCreate = await service.create(title, content, userId);
    if (postCreate.error) {
      return res.status(postCreate.statusCode).json({ message: postCreate.message });
    }
    return res.status(201).json(postCreate);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

/* router.get('/', autJWT, (_req, res) => {
  User.findAll()
    .then((Users) => res.status(200).json(Users))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ message: 'Erro' });
    });
}); */

/* router.get('/:id', autJWT, async (req, res) => {
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
}); */

/* router.delete('/me', autJWT, (req, res) => {
  const { id } = req.payload.useData.dataValues;
  User.destroy({ where: { id } })
    .then(() => {
      return res.status(204).send({ message: 'Usuario excluído com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).send({ message: 'Algo deu errado' });
    });
}); */

module.exports = router;
