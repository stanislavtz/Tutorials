const router = require('express').Router();

const {
    getRegisterPage,
    getLoginPage,
    registerUser,
    loginUser,
    logoutUser } = require('./actions');

const {isGuest, isAuthenticated} = require('../middlewares/authMiddleware');

router.get('/register', isGuest, getRegisterPage);
router.post('/register', isGuest,registerUser);

router.get('/login', isGuest, getLoginPage);
router.post('/login', isGuest, loginUser);

router.get('/logout', isAuthenticated, logoutUser);

module.exports = router;