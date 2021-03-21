const express = require('express');
const userController = require('./controller/UsersController');
const loginController = require('./controller/LoginController');

const app = express();

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);

const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
