import React from 'react';
import apolloHandler from '~components/apolloHandler';
import { EventListings } from '~website/containers/EventsCalender/EventListings';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import EventListingsBrandingPeriodQuery from './EventListingsBundle.graphql';
import { graphql } from 'react-apollo';

interface OwnProps {
  brandSlug: string;
  data: any; // todo
  filter: any; // todo
}

type IProps = OwnProps;

const EventsCalender: React.FC<IProps> = ({ data: { allEvents, bundle } }) => {
  return (
    <div className="LokiContainer">
      <Helmet>
        <title>{`${bundle.name} | What's on | Sussex Students' Union`}</title>
      </Helmet>
      <h2 className="type-brevier">Event Bundle</h2>
      <h1>{bundle.name}</h1>

      <EventListings events={allEvents} removePast={false} />
    </div>
  );
};

export const EventBundle = compose<OwnProps, OwnProps>(
  graphql<any, OwnProps>(EventListingsBrandingPeriodQuery, {
    options: (props) => {
      const bundleSlug = props.match.params.bundleSlug;
      return {
        variables: {
          bundleSlug,
          filter: {
            bundle: bundleSlug,
          },
        },
      };
    },
  }),
  apolloHandler(),
)(EventsCalender);
