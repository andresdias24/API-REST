import { Schema, model } from 'mongoose';

const todosSchema = new Schema(
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

export default model("todos", todosSchema);