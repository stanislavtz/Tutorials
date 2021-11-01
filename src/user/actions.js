const bcrypt = require('bcrypt');

const { COOKIE_NAME } = require('../utils/constants');
const { register, login, getUserByUsername } = require('./services');

const getRegisterPage = (req, res) => res.render('user/register');

const registerUser = async (req, res) => {
    try {
        const { username, password, rePassword } = new Object(req.body);

        if (password !== rePassword) {
            throw { message: 'The passwords don\'t match' }
        }

        const user = await register({ username, password });
        await loginUser(req, res);

    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('user/register', { ...req.body });
    }
}

const getLoginPage = (req, res) => res.render('user/login');

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await getUserByUsername(username);
        if (!user) {
            throw { message: 'Invalid username or password' }
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw { message: 'Invalid username or password' }
        }

        const token = await login(user);

        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('user/login', { ...req.body });
    }
}

const logoutUser = async (req, res) => {
    await res.clearCookie(COOKIE_NAME);
    res.redirect('/');
}

module.exports = {
    getRegisterPage,
    getLoginPage,
    registerUser,
    loginUser,
    logoutUser
}