// la ruta de categorias es /api/category ayuda a filtrar lo que sea que guardemos ejemplo productos 
var express = require('express');
var router = express.Router();

const {create, list, remove, categoryById} = require('../controllers/categoryController');

router.get('/categories', list)
router.post('/create', create);
router.delete('/:categoryId', remove);

router.param('categoryId', categoryById);

module.exports = router;