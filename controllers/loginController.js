const { Router } = require('express');
const isAuthenticate = require('../middleware/isAuthenticate');
const isLogged = require('../middleware/isLogged');

const route = Router();

route.post('/', isLogged, isAuthenticate, async (req, res) => {
  const token = req.headers.authorization;

  return res.status(200).json(token);
});

module.exports = route;
