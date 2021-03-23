const express = require('express');
const bodyParser = require('body-parser');
const { loginController, postController, userController } = require('./controllers');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

app.use('/', bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/login', loginController);
app.use('/post', postController);
app.use('/user', userController);

const errorMiddleware = (err, _req, res, _next) => {
  console.error(err); // not suit for production
  if (err.status) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: 'Something went wrong :(' });
};

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Online on ${PORT}!`));
