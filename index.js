const express = require('express');

const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use('/user/', controllers.Users);
app.use('/login/', controllers.Login);
app.use('/post/', controllers.Posts);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
