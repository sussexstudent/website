import React from 'react';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import MyListingsQuery from './MyListings.graphql';
import { compose } from 'recompose';
import { ChildProps, graphql } from 'react-apollo';
import Loader from '../../../components/Loader';
import { MarketListing, MarketSection } from '@ussu/common/src/types/market';
import { ListingList } from '../ListingList';
import Helmet from 'react-helmet';
import { InternalAppLink } from '../../../components/InternalAppLink';

interface OwnProps {
  sectionSlug: string;
}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
  marketSection: MarketSection;
}

type IProps = OwnProps & ChildProps<{}, Result>;

const MarketMyListingsComponent: React.FC<IProps> = (props: IProps) => {
  if (props.data && props.data.loading) {
    return <Loader />;
  }

  if (
    !props.data ||
    !props.data.allMarketListings ||
    !props.data.allMarketListings.edges
  ) {
    return <h1>Error</h1>;
  }

  const edges = props.data.allMarketListings.edges;

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

const MarketMyListings = compose<OwnProps, IProps>(
  graphql<Result, IProps>(MyListingsQuery, {
    options: () => ({
      variables: {
        filters: {
          own: true,
        },
      },
    }),
  }),
)(MarketMyListingsComponent);

export { MarketMyListings };
