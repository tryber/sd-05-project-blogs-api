const express = require('express');
const userRouter = express.Router();
const rescue = require('express-rescue');
const { createUser } = require('../Service/UserServices');

userRouter.post(
  '/',
  createUser


  }),
);

module.exports = userRouter;


// User.create({ name, username, email, password })
// .then((newUser) => {
//   // Separamos a senha do restante do objeto, para que ela não seja retornada na API
//   const { id, name, username, email, createdAt, updatedAt } = newUser;

//   res.status(200).json({ id, name, username, email, createdAt, updatedAt });
// })
// .catch((e) => {
//   console.log(e.message);
//   res.status(500).send({ message: 'Algo deu errado' });
// });