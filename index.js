const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');

const mid = require('./middleware/index');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', mid.validateToken, userController.getAllUsers);

app.listen(3000, () => {
  console.log('ouvindo porta 3000!');
});
