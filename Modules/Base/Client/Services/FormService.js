'use strict';

angular.module('Base').service('Form', ['$http', '$injector', function ($http, $injector) {
	
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
			self.Element = $(ApplicationConfiguration.VendorsInitializer.Form.Validation(self.Model.GetRules()));
			
			self.Action = {
				Url: data.Url,
				Method: data.Method || 'post',
				Success: data.Success || function(){ },
				Error: data.Error || function(){ }
			};

			self.Element.bind('submit', function(event) {
				
				if (!self.IsValid()) return false;

				self.AlternateFormLoading();				
				$http[self.Action.Method](self.Action.Url, self.Model)
				.success(self.Action.Success)
				.error(self.Action.Error)
				.finally(function() {
					self.AlternateFormLoading();
					console.log(self);
				});
			});
			
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