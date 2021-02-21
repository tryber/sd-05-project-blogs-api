const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

const app = express();

app.use('/', bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postsController);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
