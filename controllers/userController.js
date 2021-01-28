const Router = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { userM, authToken } = require('../middlewares');

const secret = 'thebeatlesÉsuperestimado';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const users = Router();

users.post('/', userM.verifyCreate, (req, res) => {
  const { body } = req;
  Users.create(body)
    .then(
      (user) => {
        const token = jwt.sign({ data: user }, secret, jwtConfig);
        res.status(201).json({ token });
      },
    )
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

users.get('/', authToken, (_req, res) => {
  Users.findAll()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

users.get('/:id', authToken, (req, res) => {
  Users.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Usuário não existe' });
      }
      return res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

users.delete('/me', authToken, (req, res) => {
  const { tokenId } = req;
  Users.destroy({
    where: {
      id: tokenId,
    },
  })
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'deu ruim' });
    });
});

module.exports = users;
