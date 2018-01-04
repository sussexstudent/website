require('isomorphic-fetch');

import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/projects/website/head';
import Html from './src/projects/website/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

assets.manifest = manifest;

export default {
  html: Html,
  root: path.join(__dirname, 'src/projects/'),
  templates: {
    main: {
      head: headContent,
      template: require('./src/projects/website/layouts/main.js'),
    },
    'main-containerless': {
      head: headContent,
      template: require('./src/projects/website/layouts/main.js'),
    },
    legacy: {
      head: headContent,
      templatePublic: require('./src/projects/website/layouts/MainLegacy.js'),
      templateLoggedIn: require('./src/projects/website/layouts/MainLegacy.js'),
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: require('./src/projects/website/layouts/MainLegacy.js'),
      templateLoggedIn: require('./src/projects/website/layouts/MainLegacy.js'),
    },
  },
  pages: {
    '/': require('./src/projects/website/layouts/homepage.js'),
    '/support': require('./src/projects/website/layouts/Support.js'),
    '/whats-on': require('./src/projects/website/layouts/WhatsOn.js'),
    '/policy-generator': require('./src/projects/website/layouts/PolicyIdeaGenerator.js'),
    '/about-us': require('./src/projects/website/layouts/AboutUs.js'),
    '/plan': require('./src/projects/website/layouts/AnnualPlan.js'),
    '/soc-events': require('./src/projects/website/layouts/SocEvents.js'),
    '/discover-groups': require('./src/projects/website/layouts/SportsSocieties.js'),
    // '/officer': require('./src/projects/components/OfficerPage/index.js'),
    '/get-involved': require('./src/projects/website/layouts/GetInvolved.js'),
    '/section-page': require('./src/projects/website/layouts/SectionPage.js'),
    '/environment-feedback':
      require('./src/projects/website/layouts/environment/student-feedback.js'),
    '/environment': require('./src/projects/website/layouts/environment/environment.js'),
    '/staff': require('./src/projects/website/layouts/StaffPage'),
  },
  assets,
};
