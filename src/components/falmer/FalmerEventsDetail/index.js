import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import EventDetailQuery from './EventDetail.graphql';
import Loader from '../../Loader';
import CopyToClipboardButton from '../../CopyToClipboardButton/index';
import ImageTreatmentPreview from '../ImageTreatmentPreview';

function FalmerEventsDetail({ data: { loading, event } }) {
  return (
    <div>
      <Helmet>
        <title>
          {`${!loading && event.title} | Events`}
        </title>
      </Helmet>
      <h1 className="Heading">Events</h1>

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
            <div>
              <h2 className="Heading--medium">Images</h2>
              {event.featuredImage
                ? <ImageTreatmentPreview image={event.featuredImage} />
                : <em>No image attached to this event</em>}
            </div>
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
