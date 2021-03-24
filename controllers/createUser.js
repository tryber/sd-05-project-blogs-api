const { Users } = require('../models');

const createUser = (req, res) => {
  const { displayName, email, password, image } = req.body;

  Users.create({ displayName, email, password, image })
    .then((user) => res.status(201).json(user))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = createUser;
