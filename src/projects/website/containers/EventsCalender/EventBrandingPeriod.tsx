import React from 'react';
import apolloHandler from '~components/apolloHandler';
import { EventListings } from '~website/containers/EventsCalender/EventListings';
import Helmet from 'react-helmet';
import { compose } from 'recompose';
import EventListingsBrandingPeriodQuery from './EventListingsBrandingPeriod.graphql';
import { graphql } from 'react-apollo';

interface OwnProps {
  brandSlug: string;
  data: any; // todo
  filter: any; // todo
}

type IProps = OwnProps;

class EventsCalender extends React.Component<IProps> {
  render() {
    const {
      data: { allEvents, brandingPeriod },
      brandSlug,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{`${
            brandingPeriod.name
          } | What's on | Sussex Students' Union`}</title>
        </Helmet>
        <h2 className="type-brevier">Event Period</h2>
        <div>
          {brandingPeriod.logoVector ? (
            <img src={brandingPeriod.logoVector.resource} height="160" />
          ) : (
            <h1>{brandingPeriod.name}</h1>
          )}
          <div
            className="type-body-copy"
            dangerouslySetInnerHTML={{ __html: brandingPeriod.description }}
          />
        </div>

        <EventListings events={allEvents} removePast={!brandSlug} />
      </div>
    );
  }
}

export const EventBrandingPeriod = compose<OwnProps, OwnProps>(
  graphql<any, OwnProps>(EventListingsBrandingPeriodQuery, {
    options: (props) => {
      const brandSlug = props.brandSlug;
      return {
        variables: {
          brandSlug,
          filter: {
            brand: brandSlug,
          },
        },
      };
    },
  }),
  apolloHandler(),
)(EventsCalender);
