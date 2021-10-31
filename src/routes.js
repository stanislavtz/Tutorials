const router = require('express').Router();

const homePageController = require('./home-page/controller');
const userController = require('./user/controllers');

router.use('/', homePageController);
router.use('/user', userController);

router.all('*', (req, res) => res.render('404', {title: 'Page Not Found'}));


module.exports = () => router;