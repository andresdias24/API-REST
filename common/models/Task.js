
import { Schema, model } from 'mongoose';
const { ObjectId } = Schema

const taskSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            // un caracter de ACSII es de 1 byte que equibalen a 8 bits 
            maxlength: 32,
            unique: true
        },
        description: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32,
        },
        complete: {
            type: Boolean,
            default: false
        },
        category: {
            type: ObjectId,
            ref: "Category",
            require: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {
        // coloca una propiedad de update y delete
        timestamps: true,
        // no aparezca una propiedad __v: 0
        versionKey: false
    }
);

export default model('Task', taskSchema);

