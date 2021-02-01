const { Router } = require('express');
const isAuthenticate = require('../middleware/isAuthenticate');
const isLogged = require('../middleware/isLogged');

const route = Router();

route.post('/', isAuthenticate, isLogged, async (req, res) => {
  const { token } = req;

  return res.status(200).json(token);
});

module.exports = route;
