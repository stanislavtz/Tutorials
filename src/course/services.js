const Course = require('../models/Course');

exports.create = (data) => Course.create(data);

exports.getAll = () => Course.find().lean();