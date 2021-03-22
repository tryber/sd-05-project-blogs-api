const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});

const errorMiddleware = (err, _req, res, _next) => {
  const { message, status } = err;
  res.status(status || 500).json({ message });
};

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
