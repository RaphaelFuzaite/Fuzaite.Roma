'use strict';

module.exports = {
  Client: {
    Lib: {
      Style: [
        'Public/Lib/semantic-ui/dist/semantic.css'
      ],
      Script: [
        'Public/Lib/jquery/dist/jquery.js',
        'Public/Lib/angular/angular.js',
        'Public/Lib/angular-ui-router/release/angular-ui-router.js',
        'Public/Lib/angular-resource/angular-resource.js',
        'Public/Lib/angular-animate/angular-animate.js',
        'Public/Lib/angular-bootstrap/ui-bootstrap.js',
        'Public/Lib/angular-local-storage/dist/angular-local-storage.js',
        'Public/Lib/moment/moment.js',
        'Public/Lib/angular-momentjs/angular-momentjs.js',
        'Public/Lib/angular-input-mask-i18n/releases/masks.js',
        'Public/Lib/angular-i18n/angular-locale_pt-br.js',
        'Public/Lib/semantic-ui/dist/semantic.js',
        'Public/Lib/angular-breadcrumb/dist/angular-breadcrumb.js',
        'Public/Lib/angular-chart/angular-chart.js',
        'Public/Lib/ng-table/dist/ng-table.js',
        'Public/Init.js'
      ],
      Tests: ['Public/Lib/angular-mocks/angular-mocks.js']
    },
    Style: [
      'Modules/*/Client/Style/*.css'
    ],
    Script: [
      'Modules/Base/Client/App/Config.js',
      'Modules/Base/Client/App/Init.js',
      'Modules/*/Client/*.js',
      'Modules/*/Client/**/*.js'
    ],
    Views: ['Modules/*/Client/Views/**/*.html']
  },
  Server: {
    GulpConfig: 'gulpfile.js',
    AllJS: ['Server.js', 'Config/**/*.js', 'Modules/*/Server/**/*.js'],
    Models: 'Modules/*/Server/Models/**/*.js',
    Routes: ['Modules/*/Server/Routes/**/*.js'],
    Sockets: 'Modules/*/Server/Sockets/**/*.js',
    Config: 'Modules/*/Server/Config/*.js',
    Policies: 'Modules/*/Server/Policies/*.js',
    Views: 'Modules/*/Server/Views/*.html'
  }
};
