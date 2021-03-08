const {Router} = require('express');

const user = Router();

user.post('/', (req, res) => {
  const {displayName, email, password, image} = req.body;

  User.create({displayName, email, password, image})
})