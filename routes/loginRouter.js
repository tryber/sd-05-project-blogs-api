const { Router } = require('express');
const controllers = require('../controllers');

const loginRouter = Router();

loginRouter.post('/', controllers.login.login);

module.exports = loginRouter;