'use strict';

var base = require('../Controllers/BaseServerController');
module.exports = function(app) {
	
	//app.route('/:url(Api|Modules|Lib)/*').get(base.NotFound);
	
	app.route('/ServerError').get(base.Error);
	
	app.route('/').get(base.Index);
};