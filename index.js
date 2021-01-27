const express = require('express');
const bodyParser = require('body-parser').json();
require('dotenv').config();

const userController = require('./controllers/user.controller');

const app = express();
const PORT = process.env.PORT || 3000;
const STATUS_FAIL = 500;

app.use(bodyParser);
app.use('/', userController);

const errorMiddleware = async (err, _req, res, _next) => {
  const [message, status] = err.message.split(';');
  res.status(status || STATUS_FAIL).json({ message });
};

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
