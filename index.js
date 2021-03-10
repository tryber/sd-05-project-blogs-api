const express = require("express");

const userController = require("./controllers/userController");
const userController = require("./controllers/loginController");

const app = express();

app.use(express.json());

const PORT = 3000;

app.use("/users", userController);

app.use("/login", loginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log("ouvindo na porta 3000!"));
