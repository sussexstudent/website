require('isomorphic-fetch');

import path from 'path';
import React from 'react';
import MainLayout from './generator/layouts/main';
import { headContent, headContentLegacy } from './generator/head';
import Html from './generator/layouts/Html';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

assets.manifest = manifest;

const MainLayoutLegacy = props => <MainLayout {...props} legacy />;

// TODO: NO COMPONENT IMPORTS IN THIS FILE, USE PATHS. IMPORT ON DEMANND IN COMP.

export default {
  html: Html,
  root: path.join(__dirname, 'generator'),
  templates: {
    main: {
      head: headContent,
      templatePublic: MainLayout,
      templateLoggedIn: MainLayout,
    },
    'main-containerless': {
      head: headContent,
      templatePublic: MainLayout,
      templateLoggedIn: MainLayout,
    },
    legacy: {
      head: headContent,
      templatePublic: MainLayoutLegacy,
      templateLoggedIn: MainLayoutLegacy,
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: MainLayoutLegacy,
      templateLoggedIn: MainLayoutLegacy,
    },
  },
  pages: {
    '/': './layouts/homepage.js',
    '/support': './layouts/Support.js',
    '/get-involved': './layouts/GetInvolved.js',
    '/environment-feedback': './layouts/environment/student-feedback.js',
    '/environment': './layouts/environment/environment.js',
    '/staff': './layouts/StaffPage',
  },
  assets
};
