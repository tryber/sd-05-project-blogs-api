require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const { validateUser, validateExistence } = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.use('/login', loginController);
app.use('/user', validateUser, validateExistence, userController);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`I hear you, stop yelling! Damn port ${port}...`));
