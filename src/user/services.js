const User = require('../models/User');
const { jwtSign } = require('../utils/jwtUtil');
const { JWT_SECRET } = require('../utils/constants');

exports.register = (data) => User.create(data);

exports.login = (user) => jwtSign({_id: user._id, username: user.username}, JWT_SECRET, { expiresIn: '1d' });

exports.getOneById = (id) => User.findById(id).lean();

exports.getOne = (username) => User.findOne({ username }).lean();

exports.updateOneById = (id, user) => User.findByIdAndUpdate(id, user);

exports.deleteOneById = (id) => User.findByIdAndDelete(id);