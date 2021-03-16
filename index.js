require('dotenv').config();

const express = require('express');
const routes = require('./api/routes');

console.log(`testando ambiente: ${process.env.NODE_ENV}`);

const app = express();
const PORT = process.env.PORT || 8080;

routes(app);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}!`));
module.exports = app;
