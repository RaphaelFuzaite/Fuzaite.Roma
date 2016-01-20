'use strict';

angular.module('Base').service('GridService', ['$http', '$q', 'NgTableParams', function ($http, $q, NgTableParams) {
	
		var Grid = function(data) {
			var self = this;

            self.TableParams = new NgTableParams({},{ dataset: 
                [
                    {name: 'Moroni', age: 50},
                    {name: 'Isla', age: 59}
                ]
            });
			self.Loading = false;
            self.AlternateGridLoading();
            self.Resources = {
				Url: data.Url,
				Method: 'GET',
				Success: data.Success || function(response){
                    if (angular.isUndefined(response)) {
                        return false;
                    }
                    /*self.Data = response;
                    self.TableParams = new NgTableParams({},{
                        dataset: self.Data
                    });*/
                },
				Error: data.Error || function(){ }
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