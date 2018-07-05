const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('todos');
});

router.post('/', (req, res) => {

});

module.exports = router;