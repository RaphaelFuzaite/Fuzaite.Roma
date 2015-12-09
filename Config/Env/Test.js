'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  DB: {
    URI: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/roma-test',
    Options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  Port: process.env.PORT || 3001,
  App: {
    Title: '[Test] ' + defaultEnvConfig.App.Title
  }
};
