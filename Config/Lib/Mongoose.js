'use strict';

/**
 * Module dependencies.
 */
var config = require('../Config'),
  chalk = require('chalk'),
  path = require('path'),
  mongoose = require('mongoose');

// Replace error messages  
mongoose.Error.messages.String.enum  = 'O valor `{VALUE}` não é válido para o campo `{PATH}`.';

// Load the mongoose models
module.exports.loadModels = function () {
  // Globbing model files
  config.Files.Server.Models.forEach(function (modelPath) {
    require(path.resolve(modelPath));
  });
};

// Initialize Mongoose
module.exports.connect = function (cb) {
  var _this = this;

  var db = mongoose.connect(config.DB.URI, config.DB.Options, function (err) {
    // Log Error
    if (err) {
      console.error(chalk.red('Não foi possível conectar ao MongoDB!'));
      console.log(err);
    } else {

      // Enabling mongoose debug mode if required
      mongoose.set('debug', config.DB.Debug);

      // Call callback FN
      if (cb) cb(db);
    }
  });
};

module.exports.disconnect = function (cb) {
  mongoose.disconnect(function (err) {
    console.info(chalk.yellow('Desconectado do MongoDB.'));
    cb(err);
  });
};
