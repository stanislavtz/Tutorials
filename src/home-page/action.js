const { getAllCourses } = require('../course/services');

const number = 3;

module.exports = async function (req, res) {
    try {
        let courses = await getAllCourses(req.user);

        if (!req.user) {
            const topCourses = courses.sort((a, b) => b.enrolledUsers.length - a.enrolledUsers.length)
            res.render('home/guest', { topCourses: topCourses.slice(0, 3) });
        } else {
            res.render('home/user', { courses });
        }
    } catch (error) {
        console.error(error);
        res.status(501).render('404');
    }
}