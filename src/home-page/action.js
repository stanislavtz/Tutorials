module.exports = function (req, res) {
    try {
        if(!req.user) {
            res.render('home/guest');
        } else {
            res.render('home/user');
        }
    } catch (error) {
        res.status(501).render('404');
    }
}