const express = require('express');
const blogRouter = require('./routes/blogRouter');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (request, response) => {
//   response.send();
// });

app.use('/', blogRouter);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
