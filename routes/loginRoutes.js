const express = require('express');
const { loginControllers } = require('../controllers');

const loginRoutes = express.Router();

loginRoutes.post('/', loginControllers.login);

module.exports = loginRoutes;
