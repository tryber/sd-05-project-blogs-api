const express = require('express');
const userRouter = require('./userRoutes');

const routes = express();

routes.use('/user', userRouter);

module.exports = routes;
