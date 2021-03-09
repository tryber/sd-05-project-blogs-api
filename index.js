require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models')

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', (_req, res) => {
  User.create({ displayName: 'Luca', email: 'luca@calu.com', password: 'caluluca' });
  res.send('okay');
})

app.listen(3000, () => console.log('Ouvindo a porta 3000'));
