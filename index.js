const express = require('express');

const bodyParser = require('body-parser');

const userController = require('./controllers/UserController');

const loginController = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

app.use('/user/', userController);

app.use('/login/', loginController);

const PORT = 3000;

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
