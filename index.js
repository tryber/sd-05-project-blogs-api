const express = require('express');

const bodyParser = require('body-parser');

const userController = require('./controllers/UserController');

const app = express();

app.use(bodyParser.json());

app.use('/user/', userController);

const PORT = 3000;

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
