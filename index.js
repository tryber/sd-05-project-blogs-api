const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const usersController = require('./controller/usersController');

const loginController = require('./controller/loginController');

const postController = require('./controller/postController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ------------------------------------------

app.use('/user', usersController);

app.use('/login', loginController);

app.use('/post', postController);

const PORT = 3000;

app.listen(PORT, () => console.log(`O pai tá on na porta ${PORT}`));
