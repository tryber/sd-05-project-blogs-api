const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const postsController = require('./controllers/postsControllers');

const app = express();

app.use(bodyParser.json());

// users:

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', userController.getAll);

app.get('/user/:id', userController.getById);

app.delete('/user/me', userController.remove);

// posts

app.post('/post', postsController.create);

app.get('/post', postsController.getAll);

app.get('/post/search', postsController.getByQuery);

app.get('/post/:id', postsController.getById);

app.put('/post/:id', postsController.update);

app.delete('/post/:id', postsController.remove);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`o pai tá ON na: ${PORT}, né?`);
});
