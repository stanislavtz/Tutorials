const {
    createCourse,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    getAllCourses } = require('./services');

const { getUserById, updateUserById } = require('../user/services');

exports.getCreatePage = (req, res) => res.render('course/create');

exports.createCourse = async (req, res) => {
    try {
        const data = new Object(req.body);
        data.creator = req.user._id;

        const course = await createCourse(data);

        const user = await getUserById(req.user._id);
        user.courses.push(course._id);

        await updateUserById(user._id, user);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('course/create', { ...req.body });
    }
}

exports.getDetailsPage = async (req, res) => {
    try {
        const course = await getCourseById(req.params.courseId);
        if (course.creator == req.user._id) {
            req.user.isOwner = true;
        }

        const enrolledUsersList = course.enrolledUsers.map(u => u.toString());
        if (enrolledUsersList.includes(req.user._id)) {
            req.user.isEnroller = true;
        }

        res.render('course/details', { ...course });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
}

exports.getEditPage = async (req, res) => {
    try {
        const course = await getCourseById(req.params.courseId);

        res.render('course/edit', { ...course });
    } catch (error) {
        console.error(error);
        res.render('404');
    }
}

exports.editCourse = async (req, res) => {
    try {
        const data = new Object(req.body);
        await updateCourseById(req.params.courseId, data);
        res.redirect(`/courses/${req.params.courseId}/details`);
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('course/edit', { ...req.body });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const user = await getUserById(req.user._id);

        if (!user) {
            throw { message: 'User doesn\'t exist' }
        }

        user.courses = user.courses.filter(c => c._id == req.params.courseId);

        await deleteCourseById(req.params.courseId);
        await updateUserById(user._id, user);

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('course/details');
    }
}

exports.enrollCourse = async (req, res) => {
    try {
        const course = await getCourseById(req.params.courseId);
        if(!course) {
            throw {message: 'The course doesn\'t exist'}
        }

        await course.enrolledUsers.push(req.user._id);

        await updateCourseById(course._id, course);

        req.user.isEnroller = true;

        res.render('course/details', { ...course });

    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('home/user');
    }
}

exports.searchCourses = async (req, res) => {
    try {
        const courses = (await getAllCourses()).filter(c => c.title.toLowerCase().includes(req.query.text.toLowerCase()));
        res.render('home/user', { courses });
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.redirect('/');
    }
}