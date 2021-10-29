const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        max: [50, 'Description should includes max 50 characters']
    },
    imageUrl: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
}, { timestamps: true});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;