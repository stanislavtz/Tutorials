const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'The title should be at least 4 characters long']
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: [20, 'The description should be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'The imageUrl should starts with http:// or https://']
    },
    duration: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    enrolledUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;