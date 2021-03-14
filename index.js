const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const usersController = require('./controllers/usersController');

const loginController = require('./controllers/loginController');

app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use('/login', loginController);

app.listen(PORT, () =>
  console.log(`ouvindo alguém me chamar na porta ${PORT}!`));
