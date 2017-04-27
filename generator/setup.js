import React from 'react';
import MainLayout from './layouts/main';
import { headContent, headContentLegacy } from './head';
import GetInvolvedLayout from './layouts/getinvolved';
import Homepage from './layouts/homepage';
import Support from './layouts/Support';
import HomepageVote from './layouts/homepage-vote';
import StaffPage from './layouts/StaffPage';
import EnvironmentFeedback from './layouts/environment/student-feedback';
import EnvironmentIndex from './layouts/environment/environment';

const MainLayoutLegacy = props => <MainLayout {...props} legacy />;

export default {
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
    homepage: Homepage,
    support: Support,
    // homepageVote: HomepageVote,
    'get-involved': GetInvolvedLayout,
    'environment-feedback': EnvironmentFeedback,
    'environment': EnvironmentIndex,
    'staff': StaffPage,
  },
};
