const router = require('express').Router();

const {
    getRegisterPage,
    getLoginPage,
    registerUser,
    loginUser,
    logoutUser } = require('./actions');

router.get('/register', getRegisterPage);
router.post('/register', registerUser);

router.get('/login', getLoginPage);
router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;