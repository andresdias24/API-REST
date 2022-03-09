var express = require('express');
var router = express.Router();
var {Task}  = require('../../../common/models/Task')
/* GET home page. */
router.get('/', async function(req, res, next) {
  const tasks = await Task.find().lean()
  // {description: 'going to the gym', complete: true}
  res.render('listTask', { tasks: tasks });
});

router.post('/tasks/add', async (req, res) => {
  const task = Task(req.body)
  await task.save()
  // res.redirect("/task")
  res.status(200)
})

module.exports = router;