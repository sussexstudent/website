require('isomorphic-fetch');
import path from 'path';
import React from 'react';
import { headContent, headContentLegacy } from './src/projects/website/head';
import Html from './src/projects/website/layouts/Html';
import CompProviders from './src/components/CompProviders';
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
  skin: 'union',
  assets: {
    manifest,
    map: assets,
  },
  providers: CompProviders,
};
