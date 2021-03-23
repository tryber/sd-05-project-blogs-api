const { Users } = require('../models');

const userById = (req, res, next) => Users
  .findAll({ where: { id: req.params.id } })
  .then((users) => res.status(200).json(users))
  .catch((e) => next(e.message));

module.exports = userById;