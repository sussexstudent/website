import React from 'react';
import {BreadcrumbBar} from "~components/BreadcrumbBar";
import {Link, RouteComponentProps} from 'react-router-dom';

import MyListingsQuery from './MyListings.graphql';
import {compose} from 'recompose';
import {graphql, ChildProps} from 'react-apollo';
import Loader from "~components/Loader";
import {MarketListing, MarketSection} from "../../../types/market";
import {ListingList} from "~components/bookmarket/ListingList";

interface OwnProps extends RouteComponentProps<{ sectionSlug: string }> {

}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[]
  },
  marketSection: MarketSection
}

type IProps = OwnProps & ChildProps<{}, Result>

const MarketMyListingsComponent: React.SFC<IProps> = (props: IProps) => {
  if (props.data && props.data.loading) {
    return <Loader />
  }

  if (!props.data || !props.data.allMarketListings || !props.data.allMarketListings.edges) {
    return <h1>Error</h1>;
  }

  const edges = props.data.allMarketListings.edges;

  return (
    <div>
      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link to={`/book-market/my-listings/`}>My listings</Link>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right">
        <ListingList items={edges.map(edge => edge.node)} ownUser />
      </div>
    </div>
  );
};

const MarketMyListings = compose<OwnProps, IProps>(
  graphql<Result, IProps>(MyListingsQuery, {
    options: () => ({
      variables: {
        filters: {
          own: true
        },
      }
    })
  })
)(MarketMyListingsComponent);

export { MarketMyListings };
