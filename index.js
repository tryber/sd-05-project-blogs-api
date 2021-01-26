const express = require('express');

const bodyParser = require('body-parser');

const userController = require('./controllers/UserController');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user/', userController);

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
