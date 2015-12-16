'use strict';

var passport = require('passport'),
  Usuario = require('mongoose').model('Usuario'),
  path = require('path'),
  config = require(path.resolve('./Config/Config'));

module.exports = function (app, db) {
  
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  
  passport.deserializeUser(function (id, done) {
    Usuario.findOne({
      _id: id
    }, '-salt -password', function (err, user) {
      done(err, user);
    });
  });

  
  config.Utils.GetGlobbedPaths(path.join(__dirname, './Strategies/**/*.js')).forEach(function (strategy) {
    require(path.resolve(strategy))(config);
  });

  
  app.use(passport.initialize());
  app.use(passport.session());
};