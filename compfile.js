require('isomorphic-fetch');

import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './generator/head';
import Html from './generator/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

assets.manifest = manifest;

// TODO: NO COMPONENT IMPORTS IN THIS FILE, USE PATHS. IMPORT ON DEMAND IN COMP.

export default {
  html: Html,
  root: path.join(__dirname, 'generator'),
  templates: {
    main: {
      head: headContent,
      templatePublic: './layouts/main.js',
      templateLoggedIn: './layouts/main.js',
    },
    'main-containerless': {
      head: headContent,
      templatePublic: './layouts/main.js',
      templateLoggedIn: './layouts/main.js',
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
    '/falmer': './layouts/Falmer.js',
    '/whats-on': './layouts/WhatsOn.js',
    '/get-involved': './layouts/GetInvolved.js',
    '/section-page': './layouts/SectionPage.js',
    '/environment-feedback': './layouts/environment/student-feedback.js',
    '/environment': './layouts/environment/environment.js',
    '/staff': './layouts/StaffPage',
  },
  assets
};
