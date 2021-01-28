const { Router } = require('express');

const router = Router();
const service = require('../services/userService');
/* const { User } = require('../models'); */
const createJWT = require('../middlewares/createTokenJWT');

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
    res.status(500).send(err.message);
  }
});

/* router.get('/', (_req, res) => {
  User.findAll()
    .then((Users) => {
      res.status(200).json(Users);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: 'Erro'});
    });
}); */

/* router.get('/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then((Users) => {
      if (Users === null) {
        res.status(404).send({ message: 'Usuario não encontrado' });
      }

      res.status(200).json(Users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
}); */

/* router.put('/:id', (req, res) => {
  const { author, pageQuantity } = req.body;

  User.update(
    { author, pageQuantity },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((Users) => {
      res.status(200).send({ message: 'Usuario atualizado com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
}); */

/* router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((Users) => {
      res.status(200).send({ message: 'Usuario excluído com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
}); */

module.exports = router;
