const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user/', controller.user);
app.use('/login/', controller.login);
app.use('/post/', controller.post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
