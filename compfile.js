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
    '/support': require('./src/projects/website/layouts/Support'),
    '/whats-on': require('./src/projects/website/layouts/WhatsOn'),
    '/policy-generator': require('./src/projects/website/layouts/PolicyIdeaGenerator'),
    '/about-us': require('./src/projects/website/layouts/AboutUs'),
    '/plan': require('./src/projects/website/layouts/AnnualPlan'),
    '/soc-events': require('./src/projects/website/layouts/SocEvents'),
    '/discover-groups': require('./src/projects/website/layouts/SportsSocieties'),
    // '/officer': require('./src/projects/components/OfficerPage/index'),
    '/get-involved': require('./src/projects/website/layouts/GetInvolved'),
    '/section-page': require('./src/projects/website/layouts/SectionPage'),
    '/environment-feedback':
      require('./src/projects/website/layouts/environment/student-feedback'),
    '/environment': require('./src/projects/website/layouts/environment/environment'),
    '/staff': require('./src/projects/website/layouts/StaffPage'),
  },
  assets,
};
