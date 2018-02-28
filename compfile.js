require('isomorphic-fetch');
import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/projects/website/head';
import Html from './src/projects/website/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

export default {
  html: Html,
  root: path.join(__dirname, 'src/projects/'),
  templates: {
    main: {
      head: headContent,
      template: require('./src/projects/website/layouts/main'),
    },
    'main-containerless': {
      head: headContent,
      template: require('./src/projects/website/layouts/main'),
    },
    legacy: {
      head: headContent,
      templatePublic: require('./src/projects/website/layouts/MainLegacy'),
      templateLoggedIn: require('./src/projects/website/layouts/MainLegacy'),
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: require('./src/projects/website/layouts/MainLegacy'),
      templateLoggedIn: require('./src/projects/website/layouts/MainLegacy'),
    },
  },
  pages: {
    '/': require('./src/projects/website/layouts/homepage'),
    '/whats-on': require('./src/projects/website/layouts/WhatsOn'),
    '/policy-generator': require('./src/projects/website/layouts/PolicyIdeaGenerator'),
    '/freshers': require('./src/projects/website/layouts/Freshers'),
    '/discover-groups': require('./src/projects/website/layouts/SportsSocieties'),
    // '/officer': require('./src/projects/components/OfficerPage/index'),

    // ONE DAY REMOVED WITH CONTENT INTEGRATION
    '/staff-page': require('./src/projects/website/layouts/StaffPage'),

    // REMOVED WITH CONTENT INTEGRATION
    '/support': require('./src/projects/website/layouts/Support'),
    '/environment-feedback':
      require('./src/projects/website/layouts/environment/student-feedback'),
    '/environment': require('./src/projects/website/layouts/environment/environment'),
    '/content-explorer': require('./src/projects/website/layouts/ContentExplorer'),
    '/book-market': require('./src/components/bookmarket/BookMarketApp'),
    '/kb': require('./src/components/kb/KnowledgeBaseApplication'),
    '/kb-local': require('./src/components/kb/KnowledgeBaseApplication'),
  },
  assets: {
    manifest,
    map: assets,
  },
  contentApi: {
    endpoint: 'https://falmer.sussexstudent.com/graphql',
    template: require('./src/projects/website/layouts/ContentPage').default,
    skipPaths: ['/'],
  },
};
