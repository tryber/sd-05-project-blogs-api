const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const usersRouter = Router();

usersRouter.post('/', controllers.users.create);

usersRouter.get('/', middlewares.auth.auth, controllers.users.getAll);

module.exports = usersRouter;
