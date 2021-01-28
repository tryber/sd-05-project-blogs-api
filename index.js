// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// IMPORTATIONS
const app = express();

app.use(bodyParser.json());

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');
const { errorMdw } = require('./middlewares');

// ENDPOINTS

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);
app.use('/login', loginController);
app.use('/post', postsController);
app.use(errorMdw);

// PORT LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`On écoute la porte ${PORT}!`));
