import React from 'react';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import SECTION_LISTINGS_QUERY from './SectionListings.graphql';
import { MarketListing, MarketSection } from '@ussu/common/src/types/market';
import { ListingList } from '../ListingList';
import Helmet from 'react-helmet';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import Loader from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';

export interface MarketSectionProps
  extends RouteComponentProps<{ sectionSlug: string }> {}

interface Result {
  allMarketListings: {
    edges: { node: MarketListing }[];
  };
  marketSection: MarketSection;
}

const MarketSection: React.FC<MarketSectionProps> = (props) => {
  const { data, loading } = useQuery<Result>(SECTION_LISTINGS_QUERY, {
    variables: {
      filters: {
        section: props.match.params.sectionSlug,
      },
      sectionSlug: props.match.params.sectionSlug,
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <ErrorState />;
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
};

export { MarketSection };
