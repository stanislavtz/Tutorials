const router = require('express').Router();

const homePageController = require('./controllers/homePage');
const userController = require('./controllers/userController');
const courseController = require('./controllers/courseController');

router.use('/', homePageController);
router.use('/user', userController);
router.use('/course', courseController);

router.all('*', (req, res) => res.render('404'));


module.exports = () => router;