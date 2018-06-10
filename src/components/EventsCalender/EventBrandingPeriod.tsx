import React from 'react';
import apolloHandler from "~components/apolloHandler";
import {EventListings} from "~components/EventsCalender/EventListings";
import Helmet from "react-helmet";
import {match} from 'react-router-dom';
import {compose} from 'recompose';
import EventListingsBrandingPeriodQuery from './EventListingsBrandingPeriod.graphql';
import {graphql} from 'react-apollo';

interface RouterParams {
  brandSlug?: string;
}

interface OwnProps {
  match: match<RouterParams>;
  data: any; // todo
  filter: any; // todo
}

type IProps = OwnProps;

class EventsCalender extends React.Component<IProps> {
  render() {
    const {
      data: { allEvents, brandingPeriod },
      match,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>{`${brandingPeriod.name} | What's on | Sussex Students' Union`}</title>
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

        <EventListings
          events={allEvents}
          removePast={!match.params.brandSlug}
        />
      </div>
    );
  }
}

export const EventBrandingPeriod = compose<OwnProps, OwnProps>(
  graphql<any, OwnProps>(EventListingsBrandingPeriodQuery, {
    options: (props) => {
      const brandSlug = props.match.params.brandSlug;
      return {
        variables: {
          brandSlug,
          filter: {
            brandSlug,
          },
        },
      };
    },
  }),
  apolloHandler(),
)(EventsCalender);
