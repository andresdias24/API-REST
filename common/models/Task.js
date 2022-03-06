var mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            require: true,
            maxlength: 50,
            unique: true
        },
        description: {
            type: String,
            require: true,
        },
        complete: {
            type: Boolean,
            default: false
        }
    },
    {
        // coloca una propiedad de update y delete
        timestamps: true,
        // no aparezca una propiedad __v: 0
        versionKey: false
    }
);

module.exports.Task=  mongoose.model('Task', taskSchema);