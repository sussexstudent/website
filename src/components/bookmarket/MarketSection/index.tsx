import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import { Link, RouteComponentProps } from 'react-router-dom';
import SECTION_LISTINGS_QUERY from './SectionListings.graphql';
import { MarketListing, MarketSection } from '../../../types/market';
import { ListingList } from '~components/bookmarket/ListingList';
import Helmet from 'react-helmet';
import { HandledQuery } from '~components/HandledQuery';

interface OwnProps extends RouteComponentProps<{ sectionSlug: string }> {}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
  marketSection: MarketSection;
}

type IProps = OwnProps;

class SectionListingsQuery extends HandledQuery<
  Result,
  { filters: { section: string }; sectionSlug: string }
> {}

const MarketSection: React.SFC<IProps> = (props: IProps) => {
  return (
    <SectionListingsQuery
      query={SECTION_LISTINGS_QUERY}
      variables={{
        filters: {
          section: props.match.params.sectionSlug,
        },
        sectionSlug: props.match.params.sectionSlug,
      }}
    >
      {({ data }) => {
        if (!data) {
          return;
        }
        const edges = data.allMarketListings.edges;

        return (
          <div>
            <Helmet title={data.marketSection && data.marketSection.title} />

            <BreadcrumbBar>
              <Link to="/book-market/">Book Market</Link>
              <Link
                to={`/book-market/section/${data.marketSection &&
                  data.marketSection.slug}`}
              >
                {data.marketSection && data.marketSection.title}
              </Link>
            </BreadcrumbBar>
            <div className="Layout Layout--sidebar-right">
              <ListingList items={edges.map((edge) => edge.node)} />
            </div>
          </div>
        );
      }}
    </SectionListingsQuery>
  );
};

export { MarketSection };
