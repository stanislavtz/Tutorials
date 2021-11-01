const { getAll } = require('../course/services');

module.exports = async function (req, res) {
    try {
        res.locals.courses = await getAll();
        if (!req.user) {
            res.render('home/guest');
        } else {
            res.render('home/user');
        }
    } catch (error) {
        res.status(501).render('404');
    }
}