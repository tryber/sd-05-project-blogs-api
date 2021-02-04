const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const mid = require('./middleware/index');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/post/search', mid.validateToken, postController.getBySearchTerm);

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', mid.validateToken, userController.getAllUsers);

app.get('/user/:id', mid.validateToken, userController.getById);

app.delete('/user/me', mid.validateToken, userController.deleteUser);

app.post('/post', mid.validateToken, postController.create);

app.get('/post', mid.validateToken, postController.getAllPosts);

app.get('/post/:id', mid.validateToken, postController.getById);

app.put('/post/:id', mid.validateToken, postController.update);

app.delete('/post/:id', mid.validateToken, postController.deletePost);

app.listen(3000, () => {
  console.log('ouvindo porta 3000!');
});
