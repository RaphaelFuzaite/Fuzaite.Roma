'use strict';

module.exports = {
  Client: {
    Lib: {
      Style: [
        'Public/Lib/bootstrap/dist/css/bootstrap.min.css',
        'Public/Lib/bootstrap/dist/css/bootstrap-theme.min.css',
      ],
      Script: [
        'Public/Lib/angular/angular.min.js',
        'Public/Lib/angular-resource/angular-resource.min.js',
        'Public/Lib/angular-animate/angular-animate.min.js',
        'Public/Lib/angular-ui-router/release/angular-ui-router.min.js',
        'Public/Lib/angular-ui-utils/ui-utils.min.js',
        'Public/Lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'Public/Lib/angular-file-upload/angular-file-upload.min.js'
      ]
    },
    Style: 'Public/dist/application.min.css',
    Script: 'Public/dist/application.min.js'
  }
};
