const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        unique: true,
        validate: [/^([A-Z0-9]+)$/i, 'The username should consist only english letters and digits'],
        minlength: [5, 'The username should be at least 5 characters long']
    },
    password: {
        type: String,
        required: [true, 'The password is required'], 
        validate: [/^([A-Z0-9]+)$/i, 'The password should consist only english letters and digits'],
        minlength: [5, 'The password should be at least 5 characters long']
    },
    courses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        }
    ]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hash;
        next();
    } catch (err) {
        throw { message: 'Unsuccessful user register' }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;