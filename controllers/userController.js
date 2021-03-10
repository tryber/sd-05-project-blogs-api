const express = require("express");
// const services = require('')
const service = require("../services/userService");
const router = express.Router();

router.post("/", async (req, res) => {
  const users = await service.createUser(req.body);
  console.log("req.body:", req.body);
  console.log("controller linha 8", users);
  res.send("Foi");
});

module.exports = router;
