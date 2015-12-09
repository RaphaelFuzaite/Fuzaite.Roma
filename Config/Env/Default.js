'use strict';

module.exports = {
  App: {
    Title: 'Fuzaite.Roma | Gerenciador de Transporte Escolar',
    Description: 'Gerenciamento de transporte escolar para controle de condutores, acompanhamento de pais e agregador de escolas',
    Keywords: 'gerenciamento de transporte, fuzaite',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  Port: process.env.PORT || 3000,
  TemplateEngine: 'swig',
  SessionSecret: 'Roma',
  SessionCollection: 'sessions',
  Logo: 'Modules/Base/Img/logo.png',
  favicon: 'Modules/Base/Img/favicon.ico'
};
