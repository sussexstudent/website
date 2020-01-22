import React from 'react';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import MyListingsQuery from './MyListings.graphql';
import { Loader } from '../../../components/Loader';
import { ListingList } from '../ListingList';
import { Helmet } from 'react-helmet-async';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { useQuery } from '@apollo/react-hooks';
import { GetViewerMarketListingQuery } from '../../../generated/graphql';

const MarketMyListings: React.FC = () => {
  const { data, loading } = useQuery<GetViewerMarketListingQuery>(
    MyListingsQuery,
    {
      variables: {
        filters: { own: true },
      },
    },
  );

  if (data && loading) {
    return <Loader />;
  }

  if (!data || !data.allMarketListings || !data.allMarketListings.edges) {
    return <h1>Error</h1>;
  }

  const edges = data.allMarketListings.edges;

  return (
    <div>
      <Helmet title="My Listings" />

      <BreadcrumbBar>
        <InternalAppLink to="/book-market/">Book Market</InternalAppLink>
        <InternalAppLink to={`/book-market/my-listings/`}>
          My listings
        </InternalAppLink>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right">
        <ListingList items={edges.map((edge) => edge.node)} ownUser />
      </div>
    </div>
  );
};

export { MarketMyListings };
