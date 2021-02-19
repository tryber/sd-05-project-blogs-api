const express = require('express');

require('./config/config');

const app = express();

const userRoutes = require('./routes/User.routes');
const loginRoutes = require('./routes/Login.routes');
const postRoutes = require('./routes/Post.routes');

app.use(express.json());
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/post', postRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
// Ok Jean, não vou remover... bjs pra vc e fabiola...
app.get('/', (request, response) => {
  response.send();
});
