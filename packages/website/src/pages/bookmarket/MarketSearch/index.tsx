import React from 'react';
import qs from 'query-string';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import GET_SEARCH_QUERY from './GetSearch.graphql';
import { MarketListing } from '@ussu/common/src/types/market';
import { ListingList } from '../ListingList';
import { Field, Form } from 'react-final-form';
import { Helmet } from 'react-helmet';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { useQuery } from '@apollo/react-hooks';

export interface MarketSearchProps {
  sectionSlug?: string;
  location: any;
  navigate: any;
} // todo

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
}

const MarketSearch: React.FC<MarketSearchProps> = (props) => {
  const { data } = useQuery<Result>(GET_SEARCH_QUERY, {
    variables: {
      filters: {
        q: qs.parse(props.location.search).q,
      },
    },
  });

  function renderList() {
    if (!data || !data.allMarketListings || !data.allMarketListings.edges) {
      return <h1>Error</h1>;
    }

    const edges = data.allMarketListings.edges;

    return <ListingList items={edges.map((edge) => edge.node)} />;
  }

  const onSearchSubmit = (data: any) =>
    props.navigate(
      `/book-market/search?${qs.stringify({ q: data.query })}`,
      {},
      true,
    );

  return (
    <div>
      <Helmet title="Search" />

      <BreadcrumbBar>
        <InternalAppLink to="/book-market/">Book Market</InternalAppLink>
        <InternalAppLink to="/book-market/search">Search</InternalAppLink>
      </BreadcrumbBar>
      <div className="Layout Layout--sidebar-right">
        <div>
          <Form
            onSubmit={onSearchSubmit}
            initialValues={{ query: qs.parse(props.location.search).q }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
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

export { MarketSearch };
