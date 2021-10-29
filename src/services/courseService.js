const Course = require('../models/Course');

const getAll = () => Course.find().sort({createdAt: 1}).lean();
const getTop = (param) => Course.find().sort({users: -1}).limit(param).lean();
const create = (data) => Course.create(data);

module.exports = {
    create,
    getAll,
    getTop,
    // updateById,
    // deleteById
}