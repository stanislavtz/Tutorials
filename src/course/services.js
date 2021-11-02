const Course = require('../models/Course');

exports.createCourse = (data) => Course.create(data);

exports.getCourseById = (id) => Course.findById(id).lean();

exports.updateCourseById = (id, course) => Course.findByIdAndUpdate(id, course);

exports.deleteCourseById = (id) => Course.findByIdAndDelete(id);

exports.getAllCourses = async (user) => {
    if(user) {
        const courses = await Course.find().sort({createdAt: 1}).lean();

        const updatedCourses = courses.reduce((acc, course) => {
            course.created = course.createdAt.toString().split(' GMT')[0];
            acc.push(course);

            return acc;
        }, []);
        
        return updatedCourses;
    }

    return Course.find({}).lean();
}