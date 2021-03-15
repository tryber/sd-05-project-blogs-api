const express = require('express');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

const app = express();

app.use(express.json());

const PORT = 3000;

app.use('/users', userController);

app.use('/login', loginController);

app.use('/posts', postsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
