const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
// const userMiddleware = require('./middlewares/userMiddleware');
const loginController = require('./controllers/loginController');
// const postController = require('./controllers/postController');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user/', userController);
app.use('/login/', loginController);
// app.use('/post', postController);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`ouvindo porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
