const router = require('express').Router();

const courseService = require('../services/courseService');


const getCreatePage = async (req, res) => {
    console.log('here')
    try {
        res.render('course/create');
    } catch (error) {
        console.error(error);
        res.redirect('404');
    }
}

const createCourse = async (req, res) => {
    try {
        const data = new Object(req.body);
        data.owner = req.user._id;
        
        await courseService.create(data);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.local.error = error;
        res.render('/course/create', {...req.body})
    }
   
}
router.get('/create', getCreatePage);
router.post('/create', createCourse);


module.exports = router;