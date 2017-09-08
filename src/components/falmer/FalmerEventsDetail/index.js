import React from 'react';
import { graphql } from 'react-apollo';
import EventDetailQuery from './EventDetail.graphql';
import Loader from '../../Loader';
import CopyToClipboardButton from '../../CopyToClipboardButton/index';

function FalmerEventsDetail({ data: { loading, event } }) {
  return (
    <div>
      <h1>Events</h1>
      {loading
        ? <Loader />
        : <div>
            <h2>
              {event.title}
            </h2>
            <CopyToClipboardButton
              value={`https://falmer.sussexstudent.com/o/e/${event.eventId}`}
            >
              Copy sharing link
            </CopyToClipboardButton>
          </div>}
    </div>
  );
}

export default graphql(EventDetailQuery, {
  options: props => ({
    variables: {
      eventId: props.match.params.eventId,
    },
  }),
})(FalmerEventsDetail);
