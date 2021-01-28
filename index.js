require('dotenv').config();

const express = require('express');

const parser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(parser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.users);

app.use('/login', routes.login);

app.use('/post', routes.post);
