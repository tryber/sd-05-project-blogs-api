require('dotenv').config();
const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json());

app.use(routes);

app.get('/', (_req, res) => res.send());

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Haam... Ouvindo na porta ${PORT}, né?!`));
