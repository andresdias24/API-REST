var express = require('express');
var router = express.Router();
var {Note} =  require('../../../common/models/Note')
/* GET users listing. */

router.get('/', async function(req, res, next) {
  res.render('listNotes');
});

module.exports = router;
