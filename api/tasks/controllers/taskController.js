const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

import Task from '../../../common/models/Task';
const { errorHandler } = require('../../../helpers/dberrorHandler');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        try {
            if (err) {
                return res.status(400).json({
                    error: "Image could not be uploaded"
                })
            }
            let task = new Task(fields);

            // 1KB = 1000 bytes
            // 1MB = 1,000,000 bytes 
            // 1 Byte = 8 bits

            if (files.photo) {
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: "Image should be lass than 1MB in size"
                    })
                }
                task.photo.data = fs.readFileSync(files.photo.filepath)
                task.photo.contentType = files.photo.mimetype
            }

            task.save((error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: errorHandler(error)
                    })
                }
                res.json(result);
            })
        } catch (error) {
            console.log(error)
        }
    })
}

/* GET home page. */
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    // ordena por nombre
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'

    Task.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .exec((err, task) => {
            if (err) {
                return res.status(400).json({
                    error: "paquetes not found"
                })
            }
            res.json(task);
        })
}

exports.taskId = (req, res, next, id) => {
    Task.findById(id)
        .populate("category")
        .exec((err, task) => {
            if (err || !task) {
                return res.status(400).json({
                    error: "task not found"
                });
            }
            req.task = task;
            next();
        })
}

exports.photo = (req, res, next) => {
    console.log("😆👽🕳👨‍💻 🧬 ~ file: taskController.js ~ line 97 ~ req", req.task)
    if (req.task.photo.data) {
        res.set('Content-Type', req.task.photo.contentType)
        return res.send(req.task.photo.data)
    }
    next();
}

exports.remove = (req, res) => {
    let task = req.task
    task.remove((err, deleteTask) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "task was deleted succesfully"
        })
    })
}