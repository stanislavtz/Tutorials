const router = require('express').Router();
const { 
    getCreatePage, 
    createCourse,
    getDetailsPage,
    getEditPage,
    editCourse,
    deleteCourse,
    enrollCourse } = require('./actions');

router.get('/create', getCreatePage);
router.post('/create', createCourse);

router.get('/:courseId/details', getDetailsPage);

router.get('/:courseId/edit', getEditPage);
router.post('/:courseId/edit', editCourse);

router.get('/:courseId/delete', deleteCourse);

router.get('/:courseId/enroll', enrollCourse);

module.exports = router;