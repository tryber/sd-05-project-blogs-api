const express = require('express');
// require('dotenv').config();
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());

// ----------------------------------------------------------------------------------
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// ----------------------------------------------------------------------------------
app.use(controllers.users);
app.use(controllers.posts);

const PORT = 3000;
// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blogueirinha, Blogueirinha, Bloguerinha... só no ${PORT}`));
