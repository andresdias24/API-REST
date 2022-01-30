const mongoose = require('mongoose')


const todosSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            require: true,
            maxlength: 50,
            unique: true
        },
        complete: Boolean
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports.Todos = mongoose.model('Todo', todosSchema)