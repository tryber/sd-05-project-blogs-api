const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', usersController);

const PORT = 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
