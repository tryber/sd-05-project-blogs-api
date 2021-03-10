const express = require('express');

const bodyParser = require('body-parser');

const handleErrors = require('./middleware/handleErrors');
const usersController = require('./controllers/usersController');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);

app.use(handleErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
