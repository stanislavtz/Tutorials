const Course = require('../models/Course');

exports.createCourse = (data) => Course.create(data);

exports.getCourseById = (id) => Course.findById(id).lean();

exports.updateCourseById = (id, course) => Course.findByIdAndUpdate(id, course);

exports.deleteCourseById = (id) => Course.findByIdAndDelete(id);

exports.getAllCourses = (user, number) => {
    if(user) {
        return Course.find().sort({createdAt: 1}).lean();
    }

    return Course.find().sort({enrolledUsers: -1}).limit(number).lean();
}