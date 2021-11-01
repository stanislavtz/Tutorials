const User = require('../models/User');
const { jwtSign } = require('../utils/jwtUtil');
const { JWT_SECRET } = require('../utils/constants');

exports.register = (data) => User.create(data);

exports.login = (user) => jwtSign({_id: user._id, username: user.username}, JWT_SECRET, { expiresIn: '1d' });

exports.getUserById = (id) => User.findById(id).lean();

exports.getUserByUsername = (username) => User.findOne({ username }).lean();

exports.updateUserById = (id, user) => User.findByIdAndUpdate(id, user);

exports.deleteUserById = (id) => User.findByIdAndDelete(id);