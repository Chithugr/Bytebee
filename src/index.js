const express = require('express');
const router = express.Router();
const userRoute = require('./controllers/userRoute');

router.get('/healthCheck', (req, res) => {
  const data = {
    status: "Working fine",
    ts: new Date().toLocaleString(),
  };
  return res.send(data).end();
})
router.use('/posts', userRoute);

module.exports = router;

