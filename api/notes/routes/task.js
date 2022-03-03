var express = require('express');
var router = express.Router();
var { Todo }  = require('../../../common/models/todos')
/* GET home page. */
router.get('/', async function(req, res, next) {

  // {description: 'going to the gym', complete: true}
  // res.render('index', { title: 'Todos', todos: todos });
  res.render('index');
});

module.exports = router;
