var express = require('express');
var router = express.Router();

const { create, list, remove, taskId, photo } = require('../controllers/taskController');

/* GET home page. */
router.get('/list', list);
router.get('/photo/:taskId', photo)
router.post('/create', create);
router.delete('/:taskId', remove);

router.param('taskId', taskId);
module.exports = router;