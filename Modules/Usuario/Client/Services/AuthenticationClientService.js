'use strict';

angular.module('Usuario').factory('Authentication', ['localStorageService', function(localStorageService) {

	var Authentication = function () {
		var self = this;
		
		self.Storage = {
			Prefix: 'fRoma',
			Definitions: {}	
		};
		
		self.Storage.Definitions.User = self.Storage.Prefix + 'User';
		
		return self;
	};
	
	Authentication.prototype.Set = function (user) {
		localStorageService.set(this.Storage.Definitions.User, user);
	};
	
	Authentication.prototype.Get = function () {
		return localStorageService.get(this.Storage.Definitions.User);
	};
	
	Authentication.prototype.Fetch = function (user) {
		if (!angular.isUndefined(user)) {
			this.Set(user);
		}
		this.Get();
	};
	
	Authentication.prototype.Remove = function () {
		localStorageService.remove(this.Storage.Definitions.User);
		this.Get();
	};
	
	return Authentication;
}]);