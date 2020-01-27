import React from 'react';
import {
  WhatsOnSidebarFilters,
  WhatsOnSidebarGroupsActiveNav,
} from '../WhatsOnSidebar';
import { WhatsOnListingsCollectionHeader } from './WhatsOnListingsCollectionHeader';
import { WhatsOnListingsGroupHeader } from './WhatsOnListingsGroupHeader';
import { WhatsOnListingsBundleHeader } from './WhatsOnListingsBundleHeader';
import { WhatsOnListingsVenueHeader } from './WhatsOnListingsVenueHeader';

interface View {
  sidebarAppends: React.FC;
  header: React.FC;
  path: string | string[];
  exact: boolean;
}

export const whatsOnListingViews: View[] = [
  {
    header: () => <WhatsOnListingsBundleHeader />,
    sidebarAppends: () => null,
    path: '/whats-on/bundle/:bundleSlug',
    exact: true,
  },
  {
    header: () => <WhatsOnListingsCollectionHeader />,
    sidebarAppends: () => <WhatsOnSidebarFilters />,
    path: '/whats-on/collections/:brandSlug',
    exact: true,
  },
  {
    header: () => <WhatsOnListingsVenueHeader />,
    sidebarAppends: () => null,
    path: '/whats-on/venues/:venueSlug',
    exact: true,
  },
  {
    header: () => <WhatsOnListingsGroupHeader />,
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
