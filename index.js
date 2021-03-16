const rescue = require('express-rescue');
const express = require('express');
const { tokenValidation } = require('./api/validations');
const { buscaPostPorTermo } = require('./api/controllers/PostController');
const routes = require('./api/routes');

require('dotenv').config();

console.log(`testando ambiente: ${process.env.NODE_ENV}`);

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/post/search', tokenValidation, rescue(buscaPostPorTermo));
app.get('/', (_request, response) => { response.send(); });
// não remova esse endpoint, e para o avaliador funcionar

routes(app);
app.use((err, _req, res, _next) => {
  if (err.status) {
    console.log('deu ruim!!!');
    return res.status(err.status).json(err);
  }
});

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}!`));
module.exports = app;
