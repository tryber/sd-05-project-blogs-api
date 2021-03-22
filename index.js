const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const postRouter = require('./controllers/post');

// Rotas
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Thacki thacki ${PORT}!`));
