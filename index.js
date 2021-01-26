const express = require('express');
const bodyParser = require('body-parser');
const users = require('./controllers/userController');
const login = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());

app.use('/user', users);
app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// app.use('*', (req, res) => res.send('Page Not found'));
app.listen(3000, () => console.log('ouvindo porta 3000!'));
