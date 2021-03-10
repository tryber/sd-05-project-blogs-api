const express = require("express");
const service = require("../services");
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await service(req.body);
  res.send("Ok");
});

module.exports = router;
