import React from 'react';
import qs from 'query-string';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';

import GetSearch from './GetSearch.graphql';
import { compose } from 'recompose';
import { graphql, ChildProps } from 'react-apollo';
import Loader from '~components/Loader';
import { MarketListing } from '../../../types/market';
import { ListingList } from '~components/bookmarket/ListingList';
import { Field, Form } from 'react-final-form';
import Helmet from 'react-helmet';

interface OwnProps extends RouteComponentProps<{ sectionSlug?: string }> {}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
}

type IProps = OwnProps & ChildProps<{}, Result>;

const MarketSearchComponent: React.SFC<IProps> = (props: IProps) => {
  function renderList() {
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

    return <ListingList items={edges.map((edge) => edge.node)} />;
  }

  const onSearchSubmit = (data: any) =>
    (props as any).history.push(
      `/book-market/search?${qs.stringify({ q: data.query })}`,
    );

  return (
    <div>
      <Helmet title="Search" />

      <BreadcrumbBar>
        <Link to="/book-market/">Book Market</Link>
        <Link to="/book-market/search">Search</Link>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right">
        <div>
          <Form
            onSubmit={onSearchSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="query"
                  className="HeaderSearch"
                  component="input"
                  type="search"
                  placeholder="Search by author or title"
                />
              </form>
            )}
          />
          {renderList()}
        </div>
      </div>
    </div>
  );
};

const MarketSearch = compose<OwnProps, IProps>(
  graphql<Result, IProps>(GetSearch, {
    options: (props) => ({
      variables: {
        filters: {
          q: qs.parse(props.location.search).q,
        },
      },
    }),
  }),
)(MarketSearchComponent);

export { MarketSearch };
