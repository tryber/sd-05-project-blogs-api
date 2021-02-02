const express = require('express');
const { loginController, userController, postController } = require('./controllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send();
});
app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
