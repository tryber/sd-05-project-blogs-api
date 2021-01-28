const express = require('express');

const bodyParser = require('body-parser');
const users = require('./controllers/userController');
const login = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

app.use('/user', users);
app.use('/login', login);

app.listen(3000, () => console.log('o pai ta na porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
