const express = require('express');
const { postController } = require('../controllers');
const { tokenValidation, postValidation } = require('../middlewares');

const postRoutes = express.Router();

postRoutes.post('/', tokenValidation, postValidation, postController.create);

postRoutes.get('/', tokenValidation, postController.index);

postRoutes.get('/:id', tokenValidation, postController.show);

module.exports = postRoutes;
