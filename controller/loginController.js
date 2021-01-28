const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const validateLoginInformation = require('../middleware/validateLoginInformation');

const route = Router();

route.post('/', validateLoginInformation, authenticate, async (req, res) => {
  const { token } = req;

  return res.status(200).json({ token });
});

module.exports = route;
