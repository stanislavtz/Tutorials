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

router.get('/create', isAuthenticated, getCreatePage);
router.post('/create', isAuthenticated, createCourse);

router.get('/:courseId/details', isAuthenticated, getDetailsPage);

router.get('/:courseId/edit', isAuthorized, getEditPage);
router.post('/:courseId/edit', isAuthorized, editCourse);

router.get('/:courseId/delete', isAuthorized, deleteCourse);

router.get('/:courseId/enroll', canEnroll, enrollCourse);

module.exports = router;