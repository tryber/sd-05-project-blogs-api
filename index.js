const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const usersController = require('./controllers/usersController');

const loginController = require('./controllers/loginController');

const postController = require('./controllers/postController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use('/login', loginController);

app.use('/post', postController);

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`ouvindo alguém me chamar na porta ${PORT}!`));
