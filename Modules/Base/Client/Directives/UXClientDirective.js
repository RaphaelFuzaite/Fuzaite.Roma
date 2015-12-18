'use strict';

angular.module('Base').directive('uxNgEnter', function() {
		return function (scope, elem, attrs) {
        elem.bind('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.uxNgEnter);
                });
                event.preventDefault();
            }
        });
    };   
}).directive('ngUpdateHidden',function() {
    return function(scope, elem, attr) {
        var model = attr['ng.model'];
        scope.$watch(model, function(nv) {
            elem.val(nv);
        });
    };
}).directive('ngFormService', function() {
    return function(scope, elem, attr) {
        var ng = 'ngFormService';
        scope[attr[ng]].Deferred.resolve(elem);
    };
});