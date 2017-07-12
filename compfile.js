require('isomorphic-fetch');

import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './generator/head';
import { headContent as freshersHead } from './generator/layouts/freshers/head';
import Html from './generator/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

assets.manifest = manifest;

// TODO: NO COMPONENT IMPORTS IN THIS FILE, USE PATHS. IMPORT ON DEMAND IN COMP.

export default {
  html: Html,
  root: path.join(__dirname, 'generator'),
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
    '/officer': '../src/js/components/OfficerPage/index.js',
    '/get-involved': './layouts/GetInvolved.js',
    '/section-page': './layouts/SectionPage.js',
    '/freshers': './layouts/freshers/Page.js',
    '/environment-feedback': './layouts/environment/student-feedback.js',
    '/environment': './layouts/environment/environment.js',
    // '/staff': './layouts/StaffPage',
  },
  assets,
};
