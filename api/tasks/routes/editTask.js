var express = require('express');
var router = express.Router();
var { Task } = require('../../../common/models/Task')

router.get('/:id', async function (req, res, next) {
  try {
    // {description: 'going to the gym', complete: true}
    const idTask = req.params.id
    const task = await Task.findById(idTask).lean()
    res.render('editTask', { task });
  } catch (error) {
    console.log(error.message)
  }
});


router.post('/editTaskQuery/:id', async (req, res) => {
  try {
    const task = Task(req.body)
    console.log("holas");
  } catch (error) {
    console.log(error.message);
  }
})

module.exports = router;