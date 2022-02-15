// const LocalStrategy = require('passport-local').Strategy;

// module.exports.passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.password === password) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));





// var passport = require("passport");
// var passportJWT = require("passport-jwt");
// var User = require("../models/User");
// var cfg = require("../config/config");
// var ExtractJwt = passportJWT.ExtractJwt;
// var Strategy = passportJWT.Strategy;
// var params = {
//   secretOrKey: cfg.jwtSecret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
// };

// module.exports = function() {
//   var strategy = new Strategy(params, function(payload, done) {
//     var user = User.findById(payload.id, function(err, user) {
//       if (err) {
//         return done(new Error("UserNotFound"), null);
//       } else if(payload.expire<=Date.now()) {
//         return done(new Error("TokenExpired"), null);
//       } else{
//         return done(null, user);
//       }
//     });
//   });
//   passport.use(strategy);
//   return {
//     initialize: function() {
//       return passport.initialize();
//     },
//     authenticate: function() {
//       return passport.authenticate("jwt", cfg.jwtSession);
//     }
//   };
// };
