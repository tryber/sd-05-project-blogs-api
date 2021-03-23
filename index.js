const express = require('express');
const controllers = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.user);
app.use('/login', controllers.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
