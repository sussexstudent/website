import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import EventListingsQuery from './EventListings.graphql';
import apolloHandler from '~components/apolloHandler';

import { compose } from 'recompose';
import { EventListings } from '~website/containers/EventsCalender/EventListings';

interface OwnProps {
  disableHeader: boolean;
  data: any; // todo
  filter: any; // todo
}

type IProps = OwnProps;

class EventsCalender extends React.Component<IProps> {
  render() {
    const {
      data: { allEvents },
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{`What's on | Sussex Students' Union`}</title>
        </Helmet>

        <EventListings events={allEvents} removePast={true} />
      </div>
    );
  }
}

const EventsList = compose<OwnProps, OwnProps>(
  graphql<any, OwnProps>(EventListingsQuery, {
    options: (props) => {
      return {
        variables: {
          filter: props.filter || {
            fromTime: startOfDay(new Date()).toISOString(),
            toTime: addMonths(startOfDay(new Date()), 6).toISOString(),
          },
        },
      };
    },
  }),
  apolloHandler(),
)(EventsCalender);

export { EventsList };
