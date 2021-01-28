const express = require('express');

const bodyParse = require('body-parser');

const userRouter = require('./controller/userController');

const userLogin = require('./controller/loginController');

const app = express();

app.use(bodyParse.json());

app.use('/user', userRouter);

app.use('/login', userLogin);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
