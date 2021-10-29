const router = require('express').Router();
const courseService = require('../services/courseService');

async function getHomePage(req, res) {
    let courses;

    res.locals.courses = courses;

    if (!req.user) {
        courses = await courseService.getTop(3);
        res.render('home/guest');
    } else {
        courses = await courseService.getAll();
        res.render('home/user');
    }
}

router.get('/', getHomePage);

module.exports = router;