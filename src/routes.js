const router = require('express').Router();

const homePageController = require('./home-page/controller');
const userController = require('./user/controllers');
const courseController = require('./course/controllers');

router.use('/', homePageController);
router.use('/user', userController);
router.use('/courses', courseController);

router.all('*', (req, res) => res.render('404', {title: 'Page Not Found'}));


module.exports = () => router;