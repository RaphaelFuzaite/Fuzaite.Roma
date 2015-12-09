'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'fuzaite.auckland';
  var applicationModuleVendorDependencies = ['ui.router', 'ui.bootstrap', 'ngAnimate', 'LocalStorageModule', 'ui.utils.masks', 'ncy-angular-breadcrumb', 'angularChart'];
  
  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);
    
    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };
  
  return {
    ModuleName:                applicationModuleName,
    ModuleVendorDependencies:  applicationModuleVendorDependencies,
    RegisterModule:            registerModule,
    VendorsInitializer:			   new InitVendors()
  };
})();