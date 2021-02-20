const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

const app = express();

app.use('/', bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// const errorMiddleware = (err, _req, res, _next) => {
//   console.log('passei aqui2');
//   const { message } = err;
//   return res.status(400).json({ message });
// };

// app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
