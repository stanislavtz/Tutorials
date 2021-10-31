const router = require('express').Router();

const getHomePage = require('./action');

router.get('/', getHomePage);

module.exports = router;