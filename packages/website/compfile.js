require('isomorphic-fetch');
import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/head';
import Html from './src/layouts/Html';
import CompProviders from './src/components/CompProviders';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

export default {
  html: Html,
  root: path.join(__dirname, 'src/projects/'),
  templates: {
    main: {
      head: headContent,
      template: require('./src/layouts/main'),
    },
    legacy: {
      head: headContent,
      templatePublic: require('./src/layouts/MainLegacy'),
      templateLoggedIn: require('./src/layouts/MainLegacy'),
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: require('./src/layouts/MainLegacy'),
      templateLoggedIn: require('./src/layouts/MainLegacy'),
    },
  },
  skin: 'union',
  assets: {
    manifest,
    map: assets,
  },
  providers: CompProviders,
};
