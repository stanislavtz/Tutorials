const router = require('express').Router();

const { 
    getCreatePage,
    createCourse,
    getDetailsPage,
    getEditPage,
    editCourse,
    deleteCourse,
    enrollCourse } = require('./actions');

const { isAuthenticated, isAuthorized, canEnroll } = require('../middlewares/authMiddleware');

function showSearchedCourses(req, res) {
    console.log(req.query)
    res.redirect('/')
}

router.get('/create', isAuthenticated, getCreatePage);
router.post('/create', isAuthenticated, createCourse);

router.get('/:courseId/details', isAuthenticated, getDetailsPage);

router.get('/:courseId/edit', isAuthorized, getEditPage);
router.post('/:courseId/edit', isAuthorized, editCourse);

router.get('/:courseId/delete', isAuthorized, deleteCourse);

router.get('/:courseId/enroll', canEnroll, enrollCourse);

router.get('/search', showSearchedCourses);

module.exports = router;