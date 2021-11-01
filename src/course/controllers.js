const router = require('express').Router();
const { getCreatePage, createCourse } = require('./actions');

router.get('/create', getCreatePage);
router.post('/create', createCourse);

module.exports = router;