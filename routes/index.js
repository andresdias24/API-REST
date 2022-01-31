var express = require('express');
var router = express.Router();
var { Todo }  = require('../models/todos')
/* GET home page. */
router.get('/', async function(req, res, next) {
  const todos = await Todo.find({});

  // {description: 'going to the gym', complete: true}
  res.render('index', { title: 'Todos', todos: todos });
});

module.exports = router;
