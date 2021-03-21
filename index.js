const express = require('express');

const usersRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');
const checkEmail = require('./middlewares/emailMiddleware');
const checkPwd = require('./middlewares/pwdMiddleware');
const checkDisplayName = require('./middlewares/displayNameMiddleware');
// const tokenMiddleware = require('./middlewares/tokenMiddleware');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json()); // express.json é o novo bodyparser

app.use('/user', checkEmail, checkPwd, checkDisplayName, usersRouter);

app.use('/login', loginRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Algo deu errado', errorMessage: err.message });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
