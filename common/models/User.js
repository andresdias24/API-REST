//model user ini mongoose
"use strict";

import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import uuidv1 from 'uuidv1';

const usuerSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    hashed_password: {
        type: String,
        require: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

// vrtual para la propiedad password
usuerSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });
    usuerSchema.methods = {
        authenticate: function (plainText) {
            return this.encryptPassword(plainText) === this.hashed_password;
        },
        encryptPassword: function (password) {
            if (!password) return '';
            try {
                return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
            } catch (err) {
                return '';
            }
        }
    };

export default model('User', usuerSchema);
