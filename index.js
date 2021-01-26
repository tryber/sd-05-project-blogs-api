const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user/', controllers.Users);
app.use('/login/', controllers.Login);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
