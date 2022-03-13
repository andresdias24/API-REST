var express = require('express');
var router = express.Router();
var {Task}  = require('../../../common/models/Task')

router.get('/', async function(req, res, next) {
    // {description: 'going to the gym', complete: true}
    res.render('editTask');
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