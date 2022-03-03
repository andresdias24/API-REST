import { Schema, model } from 'mongoose'


const taskSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            require: true,
            maxlength: 50,
            unique: true
        },
        description: String,
        complete: Boolean
    },
    {
        // coloca una propiedad de update y delete
        timestamps: true,
        versionKey: false
    }
);

export default  model('Task', taskSchema)