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
      template: './website/layouts/main.js',
    },
    'main-containerless': {
      head: headContent,
      template: './website/layouts/main.js',
    },
    legacy: {
      head: headContent,
      templatePublic: './website/layouts/MainLegacy.js',
      templateLoggedIn: './website/layouts/MainLegacy.js',
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: './website/layouts/MainLegacy.js',
      templateLoggedIn: './website/layouts/MainLegacy.js',
    },
  },
  pages: {
    '/': './website/layouts/homepage.js',
    '/support': './website/layouts/Support.js',
    '/whats-on': './website/layouts/WhatsOn.js',
    '/policy-generator': './website/layouts/PolicyIdeaGenerator.js',
    '/about-us': './website/layouts/AboutUs.js',
    '/plan': './website/layouts/AnnualPlan.js',
    '/soc-events': './website/layouts/SocEvents.js',
    '/discover-groups': './website/layouts/SportsSocieties.js',
    '/officer': '../components/OfficerPage/index.js',
    '/get-involved': './website/layouts/GetInvolved.js',
    '/section-page': './website/layouts/SectionPage.js',
    '/environment-feedback':
      './website/layouts/environment/student-feedback.js',
    '/environment': './website/layouts/environment/environment.js',
    '/staff': './website/layouts/StaffPage',
  },
  assets,
};
