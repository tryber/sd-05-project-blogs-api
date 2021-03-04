const { Router } = require('express');
const { Users } = require('./models');

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).json({ok: true});
});

module.exports = router;