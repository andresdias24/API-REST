var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // {description: 'going to the gym', complete: true}
  res.render('index', { title: 'Express', todos: [] });
});

module.exports = router;
