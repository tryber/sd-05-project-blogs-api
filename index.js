const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.post('/user', userController.create);

app.post('/login', userController.login);

app.get('/user', userController.getAll);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`o pai tá ON na: ${PORT}, né?`);
});
