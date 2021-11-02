const router = require('express').Router();

const {
    getCreatePage,
    createCourse,
    getDetailsPage,
    getEditPage,
    editCourse,
    deleteCourse,
    enrollCourse,
    searchCourses } = require('./actions');

const { isAuthenticated, isAuthorized, canEnroll } = require('../middlewares/authMiddleware');

router.get('/create', isAuthenticated, getCreatePage);
router.post('/create', isAuthenticated, createCourse);

router.get('/:courseId/details', isAuthenticated, getDetailsPage);

router.get('/:courseId/edit', isAuthorized, getEditPage);
router.post('/:courseId/edit', isAuthorized, editCourse);

router.get('/:courseId/delete', isAuthorized, deleteCourse);

router.get('/:courseId/enroll', canEnroll, enrollCourse);

router.get('/search', isAuthenticated, searchCourses);

module.exports = router;