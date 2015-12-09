'use strict';

angular.module('Base').filter('rawHtml', ['$sce', function ($sce) {
    
    return function (val) {
        return $sce.trustAsHtml(val);
    };
    
}]).filter('cut', function () {
    
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || '…');
    };
    
}).filter('numberFixedLen', function () {
    
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
    
}).filter('stripTags', function () {
    
    return function (val) {
        return angular.isString(val) ? val.replace(/(<([^>]+)>)/ig, ' ') : '';
    };
    
}).filter('capitalize', function () {
    
    return function (val) {
        return angular.isString(val) ? val.charAt(0).toUpperCase() + val.slice(1) : '';
    };
    
}).filter('sumOfValue', function () {
    return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
            return 0;
        }
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum = sum + parseInt(data[i][key]);
        }
        return sum;
    };
}).filter('byteNotation', function() {
    
	return function(bytes, precision, prefix) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
		if (typeof precision === 'undefined') precision = 1;
		var units = ['', 'K', 'M', 'G', 'T', 'P'],
			number = Math.floor(Math.log(bytes) / Math.log(1000));
		return prefix + (bytes / Math.pow(1000, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	};
    
}).filter('initials', function() {
    
    return function(fullName) {
        if(!angular.isString(fullName)) return '-';
        
        var pieces = fullName.split(' ');
        if(pieces.length === 1) return fullName.charAt(0).toUpperCase();
        if(pieces.length > 1 ) return pieces[0].charAt(0) + pieces[pieces.length - 1].charAt(0);
    };
    
});