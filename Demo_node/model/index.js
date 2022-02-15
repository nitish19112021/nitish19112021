const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require('./userModel');
db.role = require('./role.model');
db.refreshToken = require('./refreshToken.mode')


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;