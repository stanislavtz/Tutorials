const { getAllCourses } = require('../course/services');

const number = 3;

module.exports = async function (req, res) {
    try {
        const courses = await getAllCourses(req.user, number);

        const updatedCourses = courses.reduce((acc, el) => {
            el.created = el.createdAt.toString().split(' GMT')[0];
            acc.push(el);

            return acc;
        }, []);

        if (!req.user) {
            const topCourses = updatedCourses.sort((a, b) => b.enrolledUsers.length - a.enrolledUsers.length)
            res.render('home/guest', { topCourses: topCourses.slice(0, 3) });
        } else {
            res.render('home/user', { updatedCourses });
        }
    } catch (error) {
        console.error(error);
        res.status(501).render('404');
    }
}