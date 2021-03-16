const rescue = require('express-rescue');
const express = require('express');
const routes = require('./api/routes');
const { tokenValidation } = require('./api/validations');
const { buscaPostPorTermo } = require('./api/controllers/PostController');

require('dotenv').config();

console.log(`testando ambiente: ${process.env}`);

const app = express();
const PORT = process.env.PORT || 8080;

routes(app);
app.get('/post/search', tokenValidation, rescue(buscaPostPorTermo));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}!`));
module.exports = app;
