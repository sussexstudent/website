import React from 'react';
import { BreadcrumbBar } from '../../../components/BreadcrumbBar';
import SECTION_LISTINGS_QUERY from './SectionListings.graphql';
import { ListingList } from '../ListingList';
import { Helmet } from 'react-helmet-async';
import { InternalAppLink } from '../../../components/InternalAppLink';
import { RouteComponentProps } from 'react-router';
import { useQuery } from '@apollo/react-hooks';
import { Loader } from '../../../components/Loader';
import { ErrorState } from '../../../components/ErrorState';
import { GetListingsForSectionQuery } from '../../../generated/graphql';

export type MarketSectionProps = RouteComponentProps<{ sectionSlug: string }>;

const MarketSection: React.FC<MarketSectionProps> = ({ match }) => {
  const { data, loading } = useQuery<GetListingsForSectionQuery>(
    SECTION_LISTINGS_QUERY,
    {
      variables: {
        filters: {
          section: match.params.sectionSlug,
        },
        sectionSlug: match.params.sectionSlug,
      },
    },
  );

  if (loading) {
    return <Loader />;
  }

  if (!data?.marketSection) {
    return <ErrorState />;
  }

  const edges = data.allMarketListings.edges;

  return (
    <div>
      <Helmet title={data.marketSection.title} />

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
