import React from 'react';
import MainLayout from './layouts/main';
import { headContent, headContentLegacy } from './head';
import GetInvolvedLayout from './layouts/getinvolved';
import Homepage from './layouts/homepage';
const MainLayoutLegacy = (props) => {
  return <MainLayout legacy {...props} />
};

export default {
  templates: {
    main: {
      head: headContent,
      templateLoggedIn: MainLayout,
      templateLoggedOut: MainLayout,
    },
    'main-containerless': {
      head: headContent,
      templateLoggedIn: MainLayout,
      templateLoggedOut: MainLayout,
    },
    legacy: {
      head: headContent,
      templateLoggedIn: MainLayoutLegacy,
      templateLoggedOut: MainLayoutLegacy,
    },
    'legacy-jquery': {
      head: headContentLegacy,
      templateLoggedIn: MainLayoutLegacy,
      templateLoggedOut: MainLayoutLegacy,
    },
  },
  pages: {
    homepage: Homepage,
    'get-involved': GetInvolvedLayout,
  },
};
