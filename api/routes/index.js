const bodyParser = require('express');


module.exports = app => {
  app.use(bodyParser.json());

  
}