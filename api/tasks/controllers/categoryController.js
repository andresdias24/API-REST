import Category from '../../../common/models/Category';
const { errorHandler } = require('../../../helpers/dberrorHandler');

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data });
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    // ordena por nombre
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'

    Category.find()
        // .populate('country')
        // .sort([[sortBy, order]])
        .exec((err, category) => {
            if (err) {
                return res.status(400).json({
                    error: "category not found"
                })
            }
            res.json(category);
        })
}

exports.remove = (req, res) => {
    let category = req.category
    console.log("😆👽🕳👨‍💻 🧬 ~ file: categoryController.js ~ line 36 ~ category", category)
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category succesfully deleted"
        })
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            });
        }
        req.category = category;
        next();
    })
}