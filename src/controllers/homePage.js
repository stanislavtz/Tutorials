const router = require('express').Router();
const courseService = require('../services/courseService');

async function getHomePage(req, res) {
    if(!req.user) {
        const courses = await courseService.getTop(3);
        res.render('home/guest');
    } else {
        res.render('home/user');
    }
}

router.get('/', getHomePage);

module.exports = router;