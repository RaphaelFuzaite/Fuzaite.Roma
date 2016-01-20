'use strict';

angular.module('Base').directive('uxNgEnter', function() {
		return function (scope, elem, attr) {
        elem.bind('keydown keypress', function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attr.uxNgEnter);
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
}).directive('ngCheckboxSemanticUi', function($compile, $parse) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }
            var $input = element.find('input').eq(0);
            $input[0].checked = ctrl.$modelValue;
            $input.attr('checked', ctrl.$modelValue);
            var callbacks = {
                onEnable: attrs.onEnable && $parse(attrs.onEnable),
                onDisable: attrs.onDisable && $parse(attrs.onDisable),
                onChange: attrs.onChange && $parse(attrs.onChange)
            };
            
            function updateFn(value) {
                var cb = value ? 'onEnable' : 'onDisable';
                $input[0].checked = value;
                $input.attr('checked', value);
                if (value !== ctrl.$viewValue) {
                    if (callbacks.onChange) {
                        callbacks.onChange(scope, {checked: ctrl.$viewValue});
                    }
                    if (callbacks[cb]) {
                        callbacks[cb](scope, {checked: value});
                    }
                }
                return value;
            }

            function toggleFn(event) {
                var value = !ctrl.$modelValue;
                scope.$apply(function() {
                    ctrl.$setViewValue(value);
                });
            }
            
            ctrl.$parsers.push(updateFn);
            ctrl.$formatters.push(updateFn);
            element.on('click', toggleFn);
        }
    };
}).directive('ngRadioSemanticUi', function($controller, $parse) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }
            var $input = element.find('input').eq(0);
            $input[0].checked = ctrl.$modelValue;
            $input.attr('checked', ctrl.$modelValue);
            var callbacks = {
                onEnable: attrs.onEnable && $parse(attrs.onEnable),
                onDisable: attrs.onDisable && $parse(attrs.onDisable),
                onChange: attrs.onChange && $parse(attrs.onChange)
            };
            
            function updateFn(value) {
                var cb = value ? 'onEnable' : 'onDisable';
                $input[0].checked = value;
                $input.attr('checked', value);
                
                if (value !== ctrl.$viewValue) {
                    if (callbacks.onChange) {
                        callbacks.onChange(scope, {checked: ctrl.$viewValue});
                    }
                    if (callbacks[cb]) {
                        callbacks[cb](scope, {checked: value});
                    }
                }
                return $input.val();
            }

            function toggleFn(event) {
                var value = !ctrl.$modelValue;
                scope.$apply(function() {
                    ctrl.$setViewValue(value);
                });
            }            
            
            ctrl.$parsers.push(updateFn);
            ctrl.$formatters.push(updateFn);
            element.on('click', toggleFn);
        }
    };
});