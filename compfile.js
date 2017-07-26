require('isomorphic-fetch');

import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/projects/website/head';
import { headContent as freshersHead } from './src/projects/website/layouts/freshers/head';
import Html from './src/projects/website/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

assets.manifest = manifest;

export default {
  html: Html,
  root: path.join(__dirname, 'src/projects/website'),
  templates: {
    freshersMain: {
      head: freshersHead,
      template: './layouts/freshers/main.js',
    },
    main: {
      head: headContent,
      template: './layouts/main.js',
    },
    'main-containerless': {
      head: headContent,
      template: './layouts/main.js',
    },
    legacy: {
      head: headContent,
      templatePublic: './layouts/MainLegacy.js',
      templateLoggedIn: './layouts/MainLegacy.js',
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: './layouts/MainLegacy.js',
      templateLoggedIn: './layouts/MainLegacy.js',
    },
  },
  pages: {
    '/': './layouts/homepage.js',
    '/support': './layouts/Support.js',
    '/whats-on': './layouts/WhatsOn.js',
    '/discover-groups': './layouts/SportsSocieties.js',
    '/officer': '../../components/OfficerPage/index.js',
    '/get-involved': './layouts/GetInvolved.js',
    '/section-page': './layouts/SectionPage.js',
    '/freshers': './layouts/freshers/Page.js',
    '/environment-feedback': './layouts/environment/student-feedback.js',
    '/environment': './layouts/environment/environment.js',
    '/staff': './layouts/StaffPage',
  },
  assets,
};
