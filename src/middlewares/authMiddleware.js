const { jwtVerify } = require('../utils/jwtUtil');
const { COOKIE_NAME, JWT_SECRET } = require('../utils/constants');

exports.auth = () => async function (req, res, next) {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        return next();
    }

    try {
        const decoded = await jwtVerify(token, JWT_SECRET);
        req.user = decoded;
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.locals.error = error;
        res.render('404');
    }
}

exports.isGuest = function (req, res, next) {
    if (!req.user) {
        return next();
    }

    res.locals.error = { message: 'You are logged in' }
    res.status(401).render('404');
}

exports.isAuthenticated = function (req, res, next) {
    if (req.user) {
        return next();
    }

    res.locals.error = { message: 'You are not authenticated' }
    res.status(401).render('404');
}

exports.isAuthorized = function (req, res, next) {
    // TO DO when there is created object in DB, by logged in user!
}