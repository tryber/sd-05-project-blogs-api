const express = require('express');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

const routes = express();

routes.use('/user', userRoutes);

routes.use('/login', loginRoutes);

module.exports = routes;
