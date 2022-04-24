import { Schema, model } from 'mongoose';
const { ObjectId } = Schema


const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            // un caracter de ACSII es de 1 byte que equibalen a 8 bits 
            maxlength: 32,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model("Category", categorySchema);