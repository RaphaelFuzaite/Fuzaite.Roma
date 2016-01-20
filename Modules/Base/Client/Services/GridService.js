'use strict';

angular.module('Base').service('GridService', ['$http', '$q', 'NgTableParams', function ($http, $q, NgTableParams) {
	
		var Grid = function(data) {
			var self = this;

            self.TableParams = new NgTableParams();
			self.Loading = false;
            self.AlternateGridLoading();
            self.Resources = {
				Url: data.Url,
				Method: 'GET',
				Success: data.Success || function(response){
                    if (angular.isUndefined(response)) {
                        return false;
                    }
                    self.Data = response;
                    self.TableParams = new NgTableParams(self.Params,{
                        data: self.Data
                    });
                },
				Error: data.Error || function(){ }
			};
            
            self.Params = {
                count: 1
            };

            $http({ 
                method: self.Resources.Method, 
                url: self.Resources.Url 
            })
            .success(self.Resources.Success)
            .error(self.Resources.Error)
            .finally(function() {
                self.AlternateGridLoading();
            });
			
			return self;
		};
		
		Grid.prototype.AlternateGridLoading = function() {
			this.Loading = !this.Loading;	
		};

		return Grid;
	}
]);