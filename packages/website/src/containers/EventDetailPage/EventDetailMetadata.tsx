import React from 'react';
import Helmet from 'react-helmet';
import { Event } from '@ussu/common/src/types/events';
import JsonLd from '../../components/JsonLd';

interface EventDetailMetadataProps {
  event: Event;
}

export const EventDetailMetadata: React.FC<EventDetailMetadataProps> = ({
  event,
}) => (
  <React.Fragment>
    <Helmet>
      <title>{`${event.title} | What's on | Sussex Students' Union`}</title>
      <meta name="description" content={event.shortDescription} />
      {event.featuredImage ? (
        <meta
          property="og:image"
          content={`https://su.imgix.net/${event.featuredImage.resource}?h=1260&w=2400&fit=crop&crop=focal&auto=format`}
        />
      ) : null}
      <meta property="og:description" content={event.shortDescription} />

      <meta
        name="twitter:card"
        content={event.featuredImage ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content="@ussu" />
      <meta name="twitter:title" content={event.title} />
      <meta name="twitter:description" content={event.shortDescription} />
      {event.featuredImage ? (
        <meta
          name="twitter:image"
          content={`https://su.imgix.net/${event.featuredImage.resource}?h=1200&w=2400&fit=crop&crop=focal&auto=format`}
        />
      ) : null}
    </Helmet>
    <JsonLd
      data={{
        '@context': 'http://schema.org',
        '@type': 'Event',
        location: {
          '@type': 'Place',
          name: event.venue === null ? event.locationDisplay : event.venue.name,
        },
        name: event.title,
        startDate: event.startTime,
        endDate: event.endTime,
      }}
    />
  </React.Fragment>
);
