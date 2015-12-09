'use strict';

module.exports = {
  Secure: true,
  Port: process.env.PORT || 3000,
  DB: {
		URI: 'mongodb://f.auck-w:RvUKjkDtdPgPRehgCvb6@ds036638.mongolab.com:36638/roma-prod',
		Options: {
			User: 'f.auck-w',
			Pass: 'RvUKjkDtdPgPRehgCvb6'
		},
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
	},
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  }
};
