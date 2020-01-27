import React, { useState } from 'react';
import { Page } from '../types';
import convert from 'htmr';
import EventListingsQuery from '../../../pages/whatson/WhatsOnListings/EventListings.graphql';
import { WhatsOnEventsList } from '../../whatson/WhatsOnListings/WhatsOnEventsList';
import { useQuery } from '@apollo/react-hooks';
import { startOfDay, addMonths } from 'date-fns/esm';
import { Loader } from '../../../components/Loader';
import { GetAllEventsWithFilterQuery } from '../../../generated/graphql';

type IOfficerEventsIndex = Page<Page[]>;

interface OfficerEventsPage extends Page {
  section: IOfficerEventsIndex;
  description: string;
  curator: {
    id: BigInt;
  };
  filter: any;
}

export interface OfficerEventsPageProps {
  page: OfficerEventsPage;
}

export const OfficerEventsPage: React.FC<OfficerEventsPageProps> = ({
  page,
}) => {
  const [now] = useState(new Date());
  const { data, loading } = useQuery<GetAllEventsWithFilterQuery>(
    EventListingsQuery,
    {
      variables: {
        filter: page.filter || {
          fromTime: startOfDay(now).toISOString(),
          toTime: addMonths(startOfDay(now), 6).toISOString(),
          curatedBy: page.curator.id,
        },
      },
    },
  );

  if (loading) {
    return <Loader dark />;
  }

  if (!data?.allEvents) {
    return <h1>404</h1>;
  }

  return (
    <div>
      <div className="LokiContainer">
        <h1>{page.title}</h1>
        {convert(page.description)}
        <WhatsOnEventsList events={data.allEvents.edges} removePast={true} />
      </div>
    </div>
  );
};
