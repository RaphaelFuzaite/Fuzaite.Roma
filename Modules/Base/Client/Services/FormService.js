'use strict';

angular.module('Base').service('Form', ['$http', '$injector', '$q', function ($http, $injector, $q) {
	
		var Form = function(data) {
			var self = this;
			
			var Model = {};
			if (angular.isObject(data.Model)){
				Model = data.Model;
			} else if (angular.isString(data.Model)){
				Model = $injector.get(data.Model);
				Model = new Model();
			}
			
			self.Model = Model;
			self.Name = data.Name;
			
			self.Deferred = new $q.defer();
			self.Promise = self.Deferred.promise;
			
			self.Promise.then(function(element) {

				self.Element = ApplicationConfiguration.VendorsInitializer.Form.ValidationByElement(element, self.Model.GetRules());	
				self.Element.bind('submit', function(event) {
					if (!self.IsValid()) return false;
	
					self.AlternateFormLoading();	
					$http({ method: self.Action.Method, url: self.Action.Url, data: self.Model })
					.success(self.Action.Success)
					.error(self.Action.Error)
					.finally(function() {
						self.AlternateFormLoading();
					});
				});
			});
			
			self.Action = {
				Url: data.Url,
				Method: data.Method || 'post',
				Success: data.Success || function(){ },
				Error: data.Error || function(){ }
			};
			
			self.Loading = false;
			self.IsValid = function() {
				return self.Element.form('validate form');
			};
			
			return self;
		};
		
		Form.prototype.AlternateFormLoading = function() {
			this.Loading = !this.Loading;	
		};
		
		return Form;
	}
]);