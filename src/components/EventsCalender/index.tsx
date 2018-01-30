import React from 'react';
import cx from 'classnames';
import { match } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import setHours from 'date-fns/setHours';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';
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

const DATE_TODAY = new Date();
const DATE_TOMORROW = addDays(DATE_TODAY, 1);

const weekFromNow = setHours(addDays(new Date(), 7), 0);

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
            <a className="Button" href="/sport-societies-media/information-for-committee-members/events-trips/">
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
              <div className="EventsCalender__section-items">
                {chunk.map((part: EventPart, index: number) => {
                  const isFirstOfDate =
                    index < 1 ||
                    getSmartDate(chunk[index - 1]) !== getSmartDate(part);
                  return (
                    <div className="EventsCalender__part-container" key={index}>
                      {isFirstOfDate ? (
                        <h3 className={cx('EventsCalender__item-date-kicker')}>
                          {getSmartDate(part)}{' '}
                          <span className="EventsCalender__item-date-kicker--continuation">
                            {formatDate(
                              part.date,
                              isSameDay(part.date, DATE_TODAY) ||
                              isSameDay(part.date, DATE_TOMORROW)
                                ? ' - Do MMMM'
                                : isBefore(part.date, weekFromNow)
                                  ? 'Do MMMM'
                                  : 'MMMM',
                            )}
                          </span>
                        </h3>
                      ) : (
                        <h3
                          className={cx(
                            'EventsCalender__item-date-kicker EventsCalender__item-date-kicker--continuation',
                          )}
                        >
                          {formatDate(part.date, 'dddd Do MMMM')}
                        </h3>
                      )}
                      <EventsCalenderItem part={part} useAnchors={useAnchors} />
                    </div>
                  );
                })}
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
