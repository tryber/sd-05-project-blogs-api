const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');
const userRouter = express.Router();
const {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
} = require('../middlewares');
const generateJWT = require('../services/generateToken');

// /_ Busca um usuário _/
// userRouter.get('/:id', (req, res, next) => {
//   User.findByPk(req.params.id)
//     .then((user) => {
//       if (user === null) {
//         return res.status(404).send({ message: 'Usuário não encontrado' });
//       }
//       return res.status(200).json(user);
//     })
//     .catch((e) => {
//       console.log(e.message);
//       res.status(500).json({ message: 'Algo deu errado' });
//     });

// });

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
    return res.status(200).json({ token });
  }),
);

// userRouter.get(
//   '/',
//   rescue(async (_req, res) => {
//     const createdUser = await User.findAll();
//     console.log(createdUser);
//     res.status(201).json(createdUser);
//   })
// );

// const createUser = rescue(async (req, res) => {
//   const { body } = req;
//   const createdUser = await User.create(body);
//   const { password: _, ...userWithoutPassword } = createdUser;

//   const token = createToken(userWithoutPassword);
//   return res.status(201).json({ token });
// });

// userRouter.post(
//   '/',

//   userMiddlewares.validateUserEntries,
//   userMiddlewares.validateIfEmailIsNotDuplicate,
//   userControllers.createUser,
// );

// usersRouter.post(
//   '/',
//   rescue(async (req, res) => {
//     const { name, email, password } = req.body;
//     const userCreated = await usersServices.create(name, email, password);
//     if (!userCreated) return res.status(400).json({ message: 'User was not created' });
//     return res.status(201).json(userCreated);
//   }),
// );

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
