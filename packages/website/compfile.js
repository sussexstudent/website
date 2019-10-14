require('isomorphic-fetch');
import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/head';
import { Html } from './src/pages/Html';
import { CompProvider } from './src/components/CompProviders';
import assets from './webpack-assets.json';
import manifest from './dist/manifest.json';

export default {
  html: Html,
  root: path.join(__dirname, 'src/projects/'),
  templates: {
    main: {
      head: headContent,
      template: require('./src/pages/main'),
    },
    legacy: {
      head: headContent,
      templatePublic: require('./src/pages/MainLegacy'),
      templateLoggedIn: require('./src/pages/MainLegacy'),
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templatePublic: require('./src/pages/MainLegacy'),
      templateLoggedIn: require('./src/pages/MainLegacy'),
    },
  },
  skin: 'union',
  assets: {
    manifest,
    map: assets,
  },
  providers: CompProvider,
};
