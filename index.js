const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
const postRouter = require('./controllers/postController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
