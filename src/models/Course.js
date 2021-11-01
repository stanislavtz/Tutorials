const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
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