import React from 'react';
import cx from 'classnames';
import { match } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import EventsCalenderItem from './EventsCalenderItem';
import EventListingsQuery from './EventListings.graphql';
import EventListingsBrandingPeriodQuery from './EventListingsBrandingPeriod.graphql';
import apolloHandler from '../apolloHandler';
import { Event, EventPart } from '../../types/events';
import {
  getSmartDate,
  organisePartsForUI,
  splitEventsInToParts,
} from '~components/EventsApplication/utils';
import { compose } from 'recompose';

interface RouterParams {
  brandSlug?: string;
}

interface OwnProps {
  disableHeader: boolean;
  useAnchors: boolean;
  match: match<RouterParams>;
  data: any; // todo
  filter: any; // todo
}

type IProps = OwnProps;

function EventsCalender({
  data: { allEvents, brandingPeriod },
  disableHeader = false,
  useAnchors = false,
  match,
}: IProps) {
  const events = allEvents.edges.map(({ node }: { node: Event }) => ({
    ...node,
    startDate: new Date(node.startTime),
    endDate: new Date(node.endTime),
  }));
  // let previousDay = null;
  const eventParts = splitEventsInToParts(events, !match.params.brandSlug);
  const uiEvents = organisePartsForUI(eventParts, !match.params.brandSlug);
  // chunk by day

  return (
    <div>
      {disableHeader ? null : (
        <Helmet>
          <title>{`${
            brandingPeriod ? `${brandingPeriod.name} | ` : ''
          }What's on | Sussex Students' Union`}</title>
        </Helmet>
      )}
      {!brandingPeriod ? (
        <div className="PageHeader">
          <h1 className="PageHeader__title">{"What's on"}</h1>
          <div className="PageHeader__treats">
            <a
              className="Button"
              href="/sport-societies-media/information-for-committee-members/events-trips/"
            >
              Hold your own event
            </a>
          </div>
        </div>
      ) : null}
      {brandingPeriod ? (
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
      ) : null}
      <div className="EventsCalender">
        {uiEvents.map(({ sectionTitle, parts }) => (
          // sectionTitle might not be unique in the future
          <div className="EventsCalender__section" key={sectionTitle}>
            <h2 className="EventsCalender__section-title">{sectionTitle}</h2>
            {parts.map((chunk) => (
              <div>
                <h3 className={cx('EventsCalender__item-date-kicker')}>
                  {getSmartDate(chunk[0])}
                </h3>
              <div className="EventsCalender__section-items">
                {chunk.map((part: EventPart, index: number) => {
                  return (
                    <div className="EventsCalender__part-container" key={index}>
                      <EventsCalenderItem part={part} useAnchors={useAnchors} />
                    </div>
                  );
                })}
              </div>
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
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

const EventsBrandingPeriod = compose<OwnProps, OwnProps>(
  graphql<any, OwnProps>(EventListingsBrandingPeriodQuery, {
    options: (props) => {
      const brandSlug = props.match.params.brandSlug;
      return {
        variables: {
          brandSlug,
          filter: {
            brandSlug,
            fromTime: startOfDay(new Date()).toISOString(),
            toTime: addMonths(startOfDay(new Date()), 6).toISOString(),
          },
        },
      };
    },
  }),
  apolloHandler(),
)(EventsCalender);

export { EventsList, EventsBrandingPeriod };
