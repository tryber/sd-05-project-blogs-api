const express = require('express');
const bodyparse = require('body-parser');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

app.use(bodyparse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
