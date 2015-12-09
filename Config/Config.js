'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  chalk = require('chalk'),
  glob = require('glob'),
  fs = require('fs'),
  path = require('path');

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Validate NODE_ENV existance
 */
var validateEnvironmentVariable = function () {
  var environmentFiles = glob.sync('./Config/Env/' + process.env.NODE_ENV + '.js');
  console.log();
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }
  process.env.NODE_ENV = _.capitalize(process.env.NODE_ENV);
  // Reset console color
  console.log(chalk.white(''));
};

/**
 * Validate Secure=true parameter can actually be turned on
 * because it requires certs and key files to be available
 */
var validateSecureMode = function (config) {

  if (config.secure !== true) {
    return true;
  }

  var privateKey = fs.existsSync('./Config/sslcerts/key.pem');
  var certificate = fs.existsSync('./Config/sslcerts/cert.pem');

  if (!privateKey || !certificate) {
    console.log(chalk.red('+ Error: Certificate file or key file is missing, falling back to non-SSL mode'));
    console.log(chalk.red('  To create them, simply run the following from your shell: sh ./scripts/generate-ssl-certs.sh'));
    console.log();
    config.secure = false;
  }
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFolders = function (config, Assets) {
  // Appending files
  config.Folders = {
    Server: {},
    Client: {}
  };

  // Setting globbed Client paths
  config.Folders.Client = getGlobbedPaths(path.join(process.cwd(), 'Modules/*/Client/'), process.cwd().replace(new RegExp(/\\/g), '/'));
};

/**
 * Initialize global configuration files
 */
var initGlobalConfigFiles = function (config, Assets) {
  // Appending files
  config.Files = {
    Server: {},
    Client: {}
  };

  // Setting Globbed model files
  config.Files.Server.Models = getGlobbedPaths(Assets.Server.Models);

  // Setting Globbed route files
  config.Files.Server.Routes = getGlobbedPaths(Assets.Server.Routes);

  // Setting Globbed config files
  config.Files.Server.Configs = getGlobbedPaths(Assets.Server.Config);

  // Setting Globbed socket files
  config.Files.Server.Sockets = getGlobbedPaths(Assets.Server.Sockets);

  // Setting Globbed policies files
  config.Files.Server.Policies = getGlobbedPaths(Assets.Server.Policies);

  // Setting Globbed js files
  config.Files.Client.Script = getGlobbedPaths(Assets.Client.Lib.Script, 'Public/').concat(getGlobbedPaths(Assets.Client.Script, ['Client/', 'Public/']));

  // Setting Globbed css files
  config.Files.Client.Style = getGlobbedPaths(Assets.Client.Lib.Style, 'Public/').concat(getGlobbedPaths(Assets.Client.Style, ['Client/', 'Public/']));

  // Setting Globbed test files
  config.Files.Client.Tests = getGlobbedPaths(Assets.Client.Tests);
};

/**
 * Initialize global configuration
 */
var initGlobalConfig = function () {
  // Validate NDOE_ENV existance
  validateEnvironmentVariable();

  // Get the Default Assets
  var defaultAssets = require(path.join(process.cwd(), 'Config/Assets/Default'));

  // Get the current Assets
  var environmentAssets = require(path.join(process.cwd(), 'Config/Assets/', process.env.NODE_ENV)) || {};

  // Merge Assets
  var Assets = _.merge(defaultAssets, environmentAssets);

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'Config/Env/Default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'Config/Env/', process.env.NODE_ENV)) || {};

  // Merge config files
  var envConf = _.merge(defaultConfig, environmentConfig);

  var config = _.merge(envConf, (fs.existsSync(path.join(process.cwd(), 'Config/Env/local.js')) && require(path.join(process.cwd(), 'Config/Env/local.js'))) || {});

  // Initialize global globbed files
  initGlobalConfigFiles(config, Assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, Assets);

  // Validate Secure SSL mode can be used
  //validateSecureMode(config);

  // Expose configuration utilities
  config.Utils = {
    GetGlobbedPaths: getGlobbedPaths
  };

  return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
