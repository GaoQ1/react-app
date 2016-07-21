var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({Code:200,a:1}));
  res.end();
});

router.get('/', function(req, res, next) {
  res.send(JSON.stringify({Code:200,a:1}));
  res.end();
});

module.exports = router;
