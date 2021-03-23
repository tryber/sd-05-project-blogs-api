const express = require('express');

// const path = require('path');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
const postsRouter = require('./controllers/postController');

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postsRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
