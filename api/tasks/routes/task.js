var express = require('express');
var router = express.Router();
var {Task}  = require('../../../common/models/Task')
/* GET home page. */
router.get('/', async function(req, res, next) {
  const tasks = await Task.find().sort({_id: -1}).lean()
  // {description: 'going to the gym', complete: true}
  res.render('listTask', { tasks: tasks });
});

router.post('/addTask', async (req, res) => {
  try {
    const task = Task(req.body)
    await task.save()
    res.render("index")
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;