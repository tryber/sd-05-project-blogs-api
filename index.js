const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`I hear you, stop yelling! Damn port ${port}...`));
