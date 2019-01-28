import React from 'react';
import { BreadcrumbBar } from '~components/BreadcrumbBar';
import SECTION_LISTINGS_QUERY from './SectionListings.graphql';
import { MarketListing, MarketSection } from '~types/market';
import { ListingList } from '~website/containers/bookmarket/ListingList';
import Helmet from 'react-helmet';
import { HandledQuery } from '~components/HandledQuery';
import { InternalAppLink } from '~components/InternalAppLink';
import { RouteComponentProps } from 'react-router';

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

const MarketSection: React.FC<IProps> = (props: IProps) => {
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
              <InternalAppLink to="/book-market/">Book Market</InternalAppLink>
              <InternalAppLink
                to={`/book-market/section/${data.marketSection &&
                  data.marketSection.slug}`}
              >
                {data.marketSection && data.marketSection.title}
              </InternalAppLink>
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
