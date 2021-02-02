const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const postController = require('./controller/postController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
