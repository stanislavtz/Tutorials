const { jwtVerify } = require('../utils/jwtUtil');
const { COOKIE_NAME, JWT_SECRET } = require('../utils/constants');
const { getCourseById } = require('../course/services');
const { getUserById } = require('../user/services');

exports.auth = () => async function (req, res, next) {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        return next();
    }

    try {
        const decoded = await jwtVerify(token, JWT_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.locals.error = error;
        res.render('404');
    }
}

exports.isGuest = function (req, res, next) {
    if (!req.user) {
        return next();
    }

    res.locals.error = { message: 'You are logged in' }
    res.redirect('home/user');
}

exports.isAuthenticated = function (req, res, next) {
    if (req.user) {
        return next();
    }

    res.locals.error = { message: 'You are not authenticated' }
    res.redirect('user/login');
}

exports.isAuthorized = async function (req, res, next) {
    const course = await getCourseById(req.params.courseId);
    
    if(course.enrolledUsers.includes(req.user?._id)) {
        return next();
    }

    res.locals.error = { message: 'You are not authenticated' }
    res.redirect('user/login');
}

exports.canEnroll = async (req, res) => {
    const course = await getCourseById(req.params.courseId);
    
    if(!course.enrolledUsers.includes(req.user?._id)) {
        return next();
    }

    res.locals.error = { message: 'You are already enrolled that course' }
    res.redirect('user/login');
}