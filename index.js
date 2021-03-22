const express = require('express');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const postRouter = require('./controllers/post');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
