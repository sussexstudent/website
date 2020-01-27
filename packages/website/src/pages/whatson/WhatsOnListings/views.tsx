import React from 'react';
import {
  WhatsOnSidebarFilters,
  WhatsOnSidebarGroupsActiveNav,
} from '../WhatsOnSidebar';
import { EventBrandingPeriod } from './EventBrandingPeriod';
import { StudentGroupHeader } from './StudentGroupHeader';

interface View {
  sidebarAppends: React.FC;
  header: React.FC;
  path: string | string[];
  exact: boolean;
}

export const whatsOnListingViews: View[] = [
  {
    header: () => <h1 css={{ padding: '0 1rem' }}>bundle listings</h1>,
    sidebarAppends: () => null,
    path: '/whats-on/bundle/:bundleSlug',
    exact: true,
  },
  {
    header: () => <EventBrandingPeriod />,
    sidebarAppends: () => <WhatsOnSidebarFilters />,
    path: '/whats-on/collections/:brandSlug',
    exact: true,
  },
  {
    header: () => <StudentGroupHeader />,
    sidebarAppends: () => <WhatsOnSidebarGroupsActiveNav />,
    path: '/whats-on/groups/:groupSlug',
    exact: true,
  },
  {
    header: () => <h1 css={{ padding: '0 1rem' }}>All events</h1>,
    sidebarAppends: () => <WhatsOnSidebarFilters />,
    path: '/whats-on',
    exact: true,
  },
];
