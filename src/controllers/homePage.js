const router = require('express').Router();
const courseService = require('../services/courseService');

async function getHomePage(req, res) {
    let courses;

    if (!req.user) {
        courses = await courseService.getTop(3);
        res.render('home/guest', {courses});
    } else {
        courses = await courseService.getAll();

        courses.forEach(c => c.created = c.createdAt.toString().split(' GMT')[0]);

        res.render('home/user', {courses});
    }
}

router.get('/', getHomePage);

module.exports = router;