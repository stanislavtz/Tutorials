const { getAllCourses } = require('../course/services');

const numberOfCourses  = 3;

module.exports = async function (req, res) {
    try {
        const courses = await getAllCourses(req.user, numberOfCourses);

        res.locals.courses = courses.reduce((acc, el) => {
            el.created = el.createdAt.toString().split(' GMT')[0];
            acc.push(el);

            return acc;
        }, []);

        if (!req.user) {
            res.render('home/guest');
        } else {
            res.render('home/user');
        }
    } catch (error) {
        console.error(error);
        res.status(501).render('404');
    }
}