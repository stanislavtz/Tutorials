const User = require('../models/User');
const { jwtSign } = require('../utils/jwtUtil');
const { JWT_SECRET } = require('../utils/constants');

const register = (data) => User.create(data);

const login = (user) => jwtSign({_id: user._id, username: user.username}, JWT_SECRET, { expiresIn: '1d' });

const getOneById = (id) => User.findById(id).lean();

const getOne = (username) => User.findOne({ username }).lean();

const updateOneById = (id, user) => User.findByIdAndUpdate(id, user);

const deleteOneById = (id) => User.findByIdAndDelete(id);

module.exports = {
    register,
    login,
    getOne,
    getOneById,
    updateOneById,
    deleteOneById
}