const express = require('express');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const postRoutes = require('./postRoutes');

const routes = express();

routes.use('/user', userRoutes);

routes.use('/login', loginRoutes);

routes.use('/post', postRoutes);

module.exports = routes;
