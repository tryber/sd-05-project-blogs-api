const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');

const userRouter = express.Router();
const {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  validateToken,
} = require('../middlewares');

const generateJWT = require('../services/generateToken');

// 1 - Sua aplicação deve ter o endpoint POST /user
// done with middlewares, service being better only when you need to manipulate return
userRouter.post(
  '/',
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const createdUser = await User.create({ displayName, email, password, image });
    // res.status(201).json(createdUser);
    const token = await generateJWT(createdUser);
    return res.status(201).json({ token });
  }),
);

// 3 - Sua aplicação deve ter o endpoint GET /user
userRouter.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  }),
);

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
userRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const userById = await User.findByPk(id);
    // also possible: const userById = await User.findOne({ where: { id } });
    if (!userById) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(userById);
  }),
);

// /_ Atualiza um usuário _/
// userRouter.put('/:id', (req, res) => {
//   const { fullname, email } = req.body;

//   User.update(
//     { fullname, email },
//     {
//       where: { id: req.params.id },
//     }
//   ).then((result) => {
//     res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
//   })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).send({ message: 'Algo deu errado' });
//     });
// });

// /_ Remove um usuário _/
// userRouter.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((user) => {
//       res.status(200).send({ message: `Usuário excluído com sucesso.` });
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).send({ message: 'Algo deu errado' });
//     });
// });

module.exports = userRouter;
