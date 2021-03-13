const express = require('express');
const routes = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 3000;

routes(app);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => { response.send(); });

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
module.exports = app;
