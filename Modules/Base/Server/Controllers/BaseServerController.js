'use strict';

/**
 * Render the main application page
 */
exports.Index = function(req, res) {
	res.render('Modules/Base/Server/Views/IndexServerView.html', {
		user: req.user || null,
		request: req
	});
};

/**
 * Render the server error page
 */
exports.Error = function (req, res) {
  res.status(500).render('Modules/Base/Server/Views/500ServerView.html', {
    error: 'Oops! Algo está errado...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.NotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('Modules/Base/Server/Views/404ServerView.html', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Pasta não encontrada'
      });
    },
    'default': function () {
      res.send('Pasta não encontrada');
    }
  });
};