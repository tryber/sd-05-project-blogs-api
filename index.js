const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./Routes/UserRouter');
const errorMiddleware = require('./Middleware/errorMiddleware');
const userControllers = require('./Controllers/UserControllers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.post(
  '/login',

  userControllers.login,
);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
