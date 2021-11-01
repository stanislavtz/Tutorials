const {
    create, } = require('./services');


exports.getCreatePage = (req, res) => res.render('course/create');
exports.createCourse = async (req, res) => {
    try {
        const data = new Object(req.body);
        data.creator = req.user._id;
        await create(data);
        res.redirect('/')
    } catch (error) {
        console.error(error);
        res.locals.error = error;
        res.render('course/create', { ...req.body });
    }
}